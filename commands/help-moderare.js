const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Comenzile legate de moderare: ")
    .setDescription("")
    .addField("r!mute", "Pentru a da mut.")
    .addField("r!unmute", "Pentru  a scoate mut-ul.")
    .addField("r!tempmute", "Pentru a da mut pe o durata de timp.")
    .addField("r!kick", "Pentru a da kick.")  
    .addField("r!ban", "Pentru a da ban.")
    .addField("r!report", "Pentru a da report.")
    .setColor(0xff0000)   
    .setFooter("I'm in Beta.")   
    .setThumbnail(message.author.avatarURL) 

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help-moderare"
}