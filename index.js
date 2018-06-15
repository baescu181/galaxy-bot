const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const ms = require("ms");
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = "AIzaSyDUmo-BtB5oQr5Y3RSgYYBMj9rFKMr-W2s";
const prefix = "r!";
const fs = require("fs");
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const db = require('quick.db');

const TOKEN = "NDU0MDE5Nzk5NTEzODI1MzIx.DfnWZw.656gI5_xvPWeXuI9m5qySWve9D4";
const PREFIX = "r!";

function generateHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortune = [
    "Da",
    "Nu",
    "Poate",
    "Poftim ?",
    "Idk",
    "Scutestema",
    "Wtf",
    "...",
    "Why ?"
];

var bot = new Discord.Client();
var servers = {};

bot.on("ready", function() {
    console.log("I'm On");
bot.user.setGame('Galaxy |  r!help')
bot.user.setStatus('dnd')

});

bot.on("message", async message => {
    if (message.author.bot) return undefined;
    if (!message.content.startsWith(prefix)) return undefined;

const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
let messageArray = message.content.split(" ");
let args2 = messageArray.slice(1);
var args3 = message.content.substring(prefix.length).split(" ");

bot.on('guildMemberAdd', guildMember =>{
    db.fetchObject(`autoRole_${guildMember.guild.id}`).then(i => {
        if (!i.text.toLowerCase() === 'none') return;
        else {

            try {
                guildMember.addRole(i.text) <-- guildMember.addRole(guild.roles.find('name', i.text))
            } catch (e)  {
                console.log("A guild tried to auto-role an invalid role to someone.")
            }
        }
    })
})

    switch (args3[0].toLowerCase()) {
        case "ping":
        message.channel.sendMessage('Pong! Ping-ul tau este de  `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
            break;
        case "info":
        var embed = new Discord.RichEmbed()
        .setTitle("Info : ")
        .setDescription("")  
        .addField("Cum am fost creat ?", "Eu am fost creat de Galaxy181 in VSC.")
        .addField("Cine este creatorul meu ?", 'Creatorul meu este Galaxy181.')
        .addField("Data in care am fost creat ?", "Am fost creat pe 07/06/18.")
        .addField("Cand a fost ultimul update ?", "Ultimul update a fost pe 12/06/18.")
        .addField("Ce fel de bot sunt ?", "Sunt un bot de devertisment, muzica si comenzi de moderare.") 
        .setColor(0xff0000)   
        .setFooter("I'm in Beta.")  
        .setThumbnail(message.author.avatarURL)                                          
            message.channel.sendEmbed(embed);
            break;
        case "avatar":
            const mentionuser = message.mentions.users.first()
            var embed = new Discord.RichEmbed()
            if (message.mentions.users.size === 0) {
            embed.setDescription(`[Click aici pentru link](${message.author.avatarURL})`)
            embed.setImage(message.author.displayAvatarURL)
            embed.setColor("ff0000")
            } else {
            embed.setDescription(`[Click aici pentru link](${mentionuser.avatarURL})`)
            embed.setImage(mentionuser.displayAvatarURL)
            embed.setColor("ff0000")
            }
            message.channel.send({embed: embed})
            break;
        case "invite":
            var embed = new Discord.RichEmbed()
                .setTitle("Link")
                .setDescription(`[Click aici pentru link](${'https://discordapp.com/oauth2/authorize?client_id=454019799513825321&scope=bot&permissions=2146958591'})`)
                .setColor("ff0000")
            message.channel.send({embed: embed})
            break;
        case "gg":
            message.channel.sendMessage(message.author.toString() + "Thx. <3");
            break;
        case "say":
        let text = args.slice(1).join(" ");
        message.delete();
        message.channel.send(text);
            break;
        case "mute":
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nu ai acces la acceasta comanda !");
    
            let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if(!toMute) return message.channel.send("Nu ai mentionat pe nimeni ! !");
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
        
            return;
        case "kick":
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
    
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
            return;
        case "ban":
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
    
    
    return;
        case "serverinfo":
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Info")
        .setColor("ff0000")
        .setThumbnail(sicon)
        .addField("Nume Server", message.guild.name)
        .addField("Creat pe data de", message.guild.createdAt)
        .addField("Ai intrat pe data de", message.member.joinedAt)
        .addField("Membri", message.guild.memberCount);
    
    return message.channel.send(serverembed);
        case "report":
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
    
            return;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortune[Math.floor(Math.random() * fortune.length)]);
            else message.channel.sendMessage("Ai uitat sa pui si o intrebare.");
            break;
        case "help":
            var embed = new Discord.RichEmbed()
                .setTitle("Alege o sectiune : ")
                .setDescription("")  
                .addField("r!help-divertisment", "Pentru a vedea comenzile legate de divertisment.")
                .addField("r!help-music ", 'Pentru a vedea comenzile legate de muzica.')
                .addField("r!help-moderare", "Pentru  a vedea comenzile legate de moderare.")
                .addField("r!invite", "Pentru link-ul de invite.") 
                .setColor(0xff0000)   
                .setFooter("I'm in Beta.")   
                .setThumbnail(message.author.avatarURL)                                          
            message.channel.sendEmbed(embed);
            break;
        case "help-music":
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
            message.channel.sendEmbed(embed);
            break;
        case "help-divertisment":
            var embed = new Discord.RichEmbed()
                .setTitle("Comenzile legate de divertisment: ")
                .setDescription("")
                .addField("r!info", "Pentru a vedea informatii despre bot.")
                .addField("r!8ball [intrebare]", "Pentru a afla un raspuns random. ")
                .addField("r!ping", "Pentru a te juca ping Pong!")  
                .addField("r!salut", "Pentru a ne saluta.")
                .addField("r!say", "Pentru a repeta ce spui.")
                .addField("r!avatar", "Pentru a vedea avataru la cineva.")
                .addField("r!serverinfo", "Pentru a vedea informatile serverului.")  
                .setColor(0xff0000)   
                .setFooter("I'm in Beta.")   
                .setThumbnail(message.author.avatarURL)                                          
            message.channel.sendEmbed(embed);
            break;;
        case "help-moderare":
            var embed = new Discord.RichEmbed()
                .setTitle("Comenzile legate de moderare: ")
                .setDescription("")
                .addField("r!mute", "Pentru a da mut.")
                .addField("r!unmute", "In lucru.")
                .addField("r!kick", "Pentru a da kick.")  
                .addField("r!ban", "Pentru a da ban.")
                .addField("r!report", "Pentru a da report.")
                .setColor(0xff0000)   
                .setFooter("I'm in Beta.")   
                .setThumbnail(message.author.avatarURL)                                          
            message.channel.sendEmbed(embed);
            break;
        case "salut":
            message.channel.sendMessage(message.author.toString() + " Salut!");
            break;
        case "play":
                const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) {
                    var E31 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
                    .setTimestamp();
            return message.channel.send(E31);
};;
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                    const playlist = await youtube.getPlaylist(url);
                    const videos = await playlist.getVideos();
                    for (const video of Object.values(videos)) {
                        const video2 = await youtube.getVideoByID(video.id);  
                        await handleVideo(video2, message, voiceChannel, true); 
                    }
                        var E31 = new Discord.RichEmbed()
                        .setColor(0xff0000)
                        .addField("✅ Playlist:", `**${playlist.title}** a fost adaugata in playlist`)
                        .setTimestamp();
                    return message.channel.send(E31);
                } else {
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 5);
                            let index = 0;
                            var E32 = new Discord.RichEmbed()
                        .setColor(0xff0000)
                        .addField("Top 5 videoclipuri gasite:", `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Scire pe chat numarul corespunzator videoclipului pe care vrei sa il asculti. `)
                        .setTimestamp();
                            message.channel.send(E32);
                            try {
                                var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                    maxMatches: 1,
                                    time: 30000,
                                    errors: ['time']
                                });
                            } catch (err) {
                                console.error(err);
                                var E33 = new Discord.RichEmbed()
                                .setColor(0xff0000)
                                .addField("Eroare", "Timpul a expiart sau nu ai pus un numar")
                                .setTimestamp();
                                 return message.channel.send(E33);
                            }
                            const videoIndex = parseInt(response.first().content);
                            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                        } catch (err) {
                            console.error(err);
                            var E34 = new Discord.RichEmbed()
                            .setColor(0xff0000)
                            .addField("Eroare", "Mention owener")
                            .setTimestamp();
                        return message.channel.send(E34);
                        }
                    }
                    return handleVideo(video, message, voiceChannel);
                }
                    break;
                case "skip" :
                const voiceChannel2 = message.member.voiceChannel;
            if (!voiceChannel2) {
                var E31 = new Discord.RichEmbed()
                .setColor(0xff0000)
                .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
                .setTimestamp();
            return message.channel.send(E31);
            };
            if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.')
                serverQueue.connection.dispatcher.end('Skip command has been used!')
                return undefined;
                    break;
                case "stop" :
                if (!message.member.voiceChannel) {
                    var E38 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
                    .setTimestamp();
                return message.channel.send(E38);
                }
                if (!serverQueue) {
                    var E40 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Galaxy nu este pe un Voice Channel")
                    .setTimestamp();
                    return message.channel.send(E40);
                }
                    serverQueue.songs = [];
                var server = servers[message.guild.id];
                if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                        var E39 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Galaxy s-a deconectat",":x:")
                    .setTimestamp();
                    message.channel.sendMessage(E39);       
                    break;
                case "volume" :
                if (!message.member.voiceChannel) {
                    var E41 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
                    .setTimestamp();
                return message.channel.send(E41);
                }
                if (!serverQueue) {
                    var E42 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Galaxy nu este pe un Voice Channel")
                    .setTimestamp();
                    return message.channel.send(E42);
                }
                if (!args[1]) {
                    var E40 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Volum:", `Volumul actual este **${serverQueue.volume}**`)
                    .setTimestamp();
                    return message.channel.send(E40);
                }
                serverQueue.volume = args[1];
                serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
                {
                    var E40 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Volum:", `Volumul a fost setat la **${args[1]}**`)
                    .setTimestamp();
                    return message.channel.send(E40);
                }
                    break;
                case "now-playing" :
                if (!serverQueue) {
                    var E44 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Playlistul e gol")
                    .setTimestamp();
                    return message.channel.send(E44);
                }
                    var E45 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Now playing:", `**${serverQueue.songs[0].title}**`);
                    return message.channel.send(E45);
                    break;
                case "playlist" :
                if (!serverQueue) {
                    var E43 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Playlistul e gol")
                    .setTimestamp();
                    return message.channel.send(E43);
                }
                var E45 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("**Playlist:**", `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
                    
        **Now playing:** ${serverQueue.songs[0].title}
                            `);
                    return message.channel.send(E45);
                    break;
                case "pause" :
                if (serverQueue && serverQueue.playing) {
                    serverQueue.playing = false;
                    serverQueue.connection.dispatcher.pause();
                        var E47 = new Discord.RichEmbed()
                        .setColor(0xff0000)
                        .addField("Pause", ` ${serverQueue.songs[0].title} a fost pus pe pauza`)
                        .setTimestamp();
                        return message.channel.send(E47);
                }
                    var E46 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Galaxy nu este pe un Voice Channel")
                    .setTimestamp();
                    return message.channel.send(E46);
                    break;
                case "resume" :
                if (serverQueue && !serverQueue.playing) {
                    serverQueue.playing = true;
                    serverQueue.connection.dispatcher.resume();
                    var E48 = new Discord.RichEmbed()
                        .setColor(0xff0000)
                        .addField("Resume", `Se continua videoclipul ${serverQueue.songs[0].title}`)
                        .setTimestamp();
                        return message.channel.send(E48);
                }
                var E51 = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .addField("Eroare", "Galaxy nu este pe un Voice Channel")
                    .setTimestamp();
                    return message.channel.send(E51);
                    break;
                default:
                var T = new Discord.RichEmbed()
                .setColor(0xff0000)
                .addField("Comanda invalida",'Incearca r!help')
                message.channel.sendMessage(T); 
            }
        });
        async function handleVideo(video, msg, voiceChannel, playlist = false) {
            const serverQueue = queue.get(msg.guild.id);
            console.log(video);
            const song = {
                id: video.id,
                title: Discord.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            };
            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: msg.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                queue.set(msg.guild.id, queueConstruct);
        
                queueConstruct.songs.push(song);
        
                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(msg.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    queue.delete(msg.guild.id);
                    return msg.channel.send(`I could not join the voice channel: ${error}`);
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs);
                if (playlist) return undefined;
                else  {
                var E35 = new Discord.RichEmbed()
                .setColor(0xff0000)
                .addField(":white_check_mark: Playlist:", `**${song.title}** a fost adougata in playlist`)
                .setTimestamp();
                 return msg.channel.send(E35)
                }
            }
            return undefined;
        }
        
        function play(guild, song , message , channel) {
            const serverQueue = queue.get(guild.id);
        
            if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
                return;
            }
            console.log(serverQueue.songs);
        
            const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                .on('end', reason => {
                    if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                    else console.log(reason);
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            
                var E50 = new Discord.RichEmbed()
                .setColor(0xff0000)
                .addField("Now Playing", `**${song.title}** `)
                .setTimestamp();
                serverQueue.textChannel.send(E50) 
};

bot.login('NDU0MDE5Nzk5NTEzODI1MzIx.DfnWZw.656gI5_xvPWeXuI9m5qySWve9D4');
