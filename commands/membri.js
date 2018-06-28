const Discord = module.require("discord.js");

module.exports.run = (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .addField("Membri", bot.users.size)
    .setFooter(`Cerut de ${message.author.tag}`)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "membri"
}