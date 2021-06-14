const Discord = require("discord.js");
const alexa = require("alexa-bot-api");
const config = require("./config.json")
const fs = require("fs");

var chatbot = new alexa(config.key);

const bot = new Discord.Client({
    disableEveryone: true
});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

let prefix = config.prefix

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }
    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        //console.log(`${f} loaded!`);
        if (props.help && props.help.name) {
            bot.commands.set(props.help.name, props);
        } else {
            console.error(`file ${f} does not have .help or .help.name property!`);
        }
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    });
});

bot.on("ready", () => {
    console.log(`${bot.user.username} is now active in ${bot.guilds.cache.size} servers`);
});
let OwO;
bot.on("channelCreate", async channel => {
    if(channel.name !== "chat-bot") return;
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("DONE\n\n**DO NOT RENAME THIS CHANNEL**")
    channel.send(embed).then(OwO = channel.id)
})

bot.on("message", async message => {//chat bot
    
    if (message.content === "<@!730551121558634506>" || message.content === "<@730551121558634506>") {
        message.channel.send(`my prefix is ${prefix} \n\`${prefix} help to get list of commands\``)
    }

    if (message.author.bot || message.channel.type === "dm") return; 

    let ree = message.guild.channels.cache.find((ch) => ch.id === OwO) 
    let content = message.content;

    if(!message.content) return;
    if (message.author.bot) return;
    if (message.channel.name === ree) return;
    if (!ree) return;
    if (!ree.lastMessage) return;
    if (ree.lastMessage.content !== message.content) return;

    chatbot.getReply(content).then(r => ree.send(r));
});

bot.on("message", async message => {

    if (!message.content.startsWith(prefix)) return; 
    let args = message.content.slice(prefix.length).trim().split(/ +/g); 
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
    if (message.author.bot || message.channel.type === "dm") return; 

    if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd))
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
});

bot.login(config.token);