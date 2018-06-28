const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Userul nu exista!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Aceasta persoana nu poate fi data afara !");

    let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
     .setColor("ff0000")
     .addField("Useru dat afara", `${kUser} with ID ${kUser.id}`)
     .addField("Datafara de", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Dat afara in", message.channel)
      .addField("Ora", message.createdAt)
      .addField("Motiv", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channel.send("Nu gasesc canalul logs.");

    message.guild.member(kUser).kick(kReason)
    kickChannel.send(kickEmbed);

}

module.exports.help = {
    name: "kick"
}