const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.sendMessage(message.author.toString() + " Salut!");

}

module.exports.help = {
    name: "salut"
}