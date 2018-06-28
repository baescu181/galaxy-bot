const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Useru nu exista!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Useru nu poate fi banat!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("ff0000")
    .addField("Useru banat", `${bUser} with ID ${bUser.id}`)
    .addField("Banat de", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banat in", message.channel)
    .addField("Ora", message.createdAt)
    .addField("Motiv", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return message.channel.send("Nu exista canalu logs.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);

}

module.exports.help = {
    name: "ban"
}