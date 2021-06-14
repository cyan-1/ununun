module.exports.run = async (bot, message, args) =>{
    const m = await message.channel.send("pong")
    m.edit(`**pong** \nMessage Ping: \`${m.createdTimestamp - message.createdTimestamp}\`ms\nWebsoket Ping: \`${bot.ws.ping}\`ms\n`);
}

module.exports.help ={
    name:"ping",
    description:"pong",
    aliases:["p"],
    
}