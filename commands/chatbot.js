const Discord = require("discord.js");
module.exports.run = async (bot, message, args) =>{

    message.guild.channels.create('chat-bot')

}

module.exports.help ={
    name:"chatbot",
    description:"create a channel for the chat bot",
    aliases:["cb","cbCreate"],
    
}