const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Alege o sectiune : ")
    .setDescription("")  
    .addField("r!help-divertisment", "Pentru a vedea comenzile legate de divertisment.")
    .addField("r!help-music ", 'Pentru a vedea comenzile legate de muzica.')
    .addField("r!help-moderare", "Pentru  a vedea comenzile legate de moderare.")
    .addField("r!invite", "Pentru link-ul de invite.") 
    .setColor(0xff0000)   
    .setFooter("I'm in Beta.")   
    .setThumbnail(message.author.avatarURL)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help"
}