const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nu ai acces la acceasta comanda !");

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Nu  ai mentionat pe nimeni !");

    let  role = message.guild.roles.find(r => r.name === "Mute");

    if(!role || !toMute.roles.has(role.id)) return message.channel.send("User-ul nu are mut.");

    await toMute.removeRole(role);
    message.channel.send("Mut scos cu succes.")

}

module.exports.help = {
    name: "unmute"
}