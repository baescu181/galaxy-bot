const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Info : ")
    .setDescription("")  
    .addField("Cum am fost creat ?", "Eu am fost creat de Galaxy181 in VSC.")
    .addField("Data in care am fost creat ?", "Am fost creat pe 07/06/18.")
    .addField("Cand a fost ultimul update ?", "Ultimul update a fost pe 12/06/18.")
    .addField("Ce fel de bot sunt ?", "Sunt un bot de devertisment, muzica si comenzi de moderare.") 
    .setColor(0xff0000)   
    .setFooter("I'm in Beta.")  
    .setThumbnail(message.author.avatarURL)                                          
        message.channel.sendEmbed(embed);

}

module.exports.help = {
    name: "info"
}