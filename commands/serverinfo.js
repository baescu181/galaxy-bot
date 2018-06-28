const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Info")
    .setColor("ff0000")
    .setThumbnail(sicon)
    .addField("Nume Server", message.guild.name)
    .addField("Creat pe data de", message.guild.createdAt)
    .addField("Ai intrat pe data de", message.member.joinedAt)
    .addField("Membri", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
    name: "serverinfo"
}