const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    const mentionuser = message.mentions.users.first()
    var embed = new Discord.RichEmbed()
    if (message.mentions.users.size === 0) {
    embed.setDescription(`[Click aici pentru link](${message.author.avatarURL})`)
    embed.setImage(message.author.displayAvatarURL)
    embed.setColor("ff0000")
    } else {
    embed.setDescription(`[Click aici pentru link](${mentionuser.avatarURL})`)
    embed.setImage(mentionuser.displayAvatarURL)
    embed.setColor("ff0000")
    }
    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "avatar"
}