const Discord =  require("discord.js")

module.exports.run = async (bot, message, args) =>{
    const embed = new Discord.MessageEmbed()
    .setColor("db4f03")
    .setTitle("Help / About ün ün ün")
    .setDescription("ün ün ün is a chat bot which uses an AI to reply to members in a Discord server as if it's a real human\n\n**ün ün ün does not understand you, and cannot mean anything it 'says'**\n\n**DO NOT SHARE YOUR PERSONAL INFO WITH THE BOT EVEN IF IT \"ASKS\"**\n\n __**List of all commands**__")
    .addField("__help__", "List of all the commands and info about the bot")
    .addField("__ping__", "pong")
    .addField("__chatbot__", "create a channel for the chat bot `The bot can only reply in this channel` \n**DO  NOT RENAME THE `chat-bot` CHANNEl**\n\n")
    .addField("\n\nInvite link:", "[click me](https://discord.com/oauth2/authorize?client_id=730551121558634506&permissions=470285559&scope=bot)")
    .setFooter(`Made by cyan with hate </3`, bot.user.avatarURL())
    message.channel.send(embed)
}

module.exports.help ={
    name:"help",
    description:"List of all the commands and info about the bot ",
    aliases:["about"],
    
}