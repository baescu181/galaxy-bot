const Discord = module.require("discord.js");
const ms = module.require("ms");

module.exports.run = async (bot, message, args) => {
    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!tomute) return message.reply("User-ul nu exista.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("User-ul nu poate primi mut.");
    let muterole = message.guild.roles.find(`name`, "Mute");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "Mute",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    
    let mutetime = args[1];
    if(!mutetime) return message.reply("Nu ai pus timp-ul.");

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> a primit mut ${ms(ms(mutetime))}`);


    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> nu mai are mut!`);

    }, ms(mutetime));

}

module.exports.help = {
    name: "tempmute"
}