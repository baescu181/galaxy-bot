const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Comenzile legate de muzica: ")
    .setDescription("")
    .addField("r!play ", 'Pentru a asculta muzica.')
    .addField("r!skip", 'Pentru a da skip la urmatoarea pesa din playlist.')
    .addField("r!stop", 'Pentru a opri melodia.')
    .addField("r!volume", 'Pentru ajusta volumul botului muzica.')
    .addField("r!now-playing", 'Pentru a vedea ce melodie se reda.')
    .addField("r!pause", 'Pentru a pune pe pauza muzica.')
    .addField("r!resume", 'Pentru a relua muzica.')   
    .setColor(0xff0000)   
    .setFooter("I'm in Beta.")   
    .setThumbnail(message.author.avatarURL)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help-music"
}