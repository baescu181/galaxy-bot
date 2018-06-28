const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Useru nu exista.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reporturi")
    .setColor("ff0000")
    .addField("User Raportat", `${rUser} with ID: ${rUser.id}`)
    .addField("Raportat de", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Ora", message.createdAt)
    .addField("Motiv", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Nu exista canalul logs.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}