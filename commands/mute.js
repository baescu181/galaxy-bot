const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nu ai acces la acceasta comanda !");
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Nu ai mentionat pe nimeni !");
    let role = message.guild.roles.find(r => r.name === "Mute");
    if(!role){
      try {
        role = await message.guild.createRole({
          name: "Mute",
          color:"#000000",
          permissions:[]
        });

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack)
      }
    }

    if(toMute.roles.has(role.id)) return message.channel.send('Acest user are deja mut !');

    await(toMute.addRole(role));
    message.channel.send("User-ul a primit mut cu succes !");

}

module.exports.help = {
    name: "mute"
}