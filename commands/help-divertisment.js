const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    var embed = new Discord.RichEmbed()
    .setTitle("Comenzile legate de divertisment: ")
    .setDescription("")
    .addField("r!info", "Pentru a vedea informatii despre bot.")
    .addField("r!8ball [intrebare]", "Pentru a afla un raspuns random. ")
    .addField("r!ping", "Pentru a te juca ping Pong!")  
    .addField("r!salut", "Pentru a ne saluta.")
    .addField("r!say", "Pentru a repeta ce spui.")
    .addField("r!membri", "Pentru a vedea numarul de membri.")
    .addField("r!avatar", "Pentru a vedea avataru la cineva.")
    .addField("r!serverinfo", "Pentru a vedea informatile serverului.")
    .addField("r!sanse", "Pentru a sansele a 2 obiecte.")  
    .addField("r!gay", "Pentru a vedea cat de gay esti.")
    .addField("r!meme", "Pentru a vedea niste memeuri.")      
    .setColor(0xff0000)   
    .setFooter("I'm in Beta.")   
    .setThumbnail(message.author.avatarURL)

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "help-divertisment"
}