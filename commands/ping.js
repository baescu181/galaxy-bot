const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.sendMessage('Pong! Ping-ul tau este de  `' + `${Date.now() - message.createdTimestamp}` + ' ms`');

}

module.exports.help = {
    name: "ping"
}