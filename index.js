const express = require('express');
const app = express();
const port = 3000;//3000

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require("./config.json");
const fs = require("fs");
const pm = require('pretty-ms');
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Citar a un usuario para respuesta
client.on('message', message =>{
if(message.author.bot) return;

let autor_res = message.author.username;
if(message.content.startsWith(config.prefix)){
  let argtxt = message.content.substring(config.prefix.length).split(" ");
  if (!argtxt[1])return;
  let arg_res= message.content.substring(argtxt[1].length+3,);
  
  //message.channel.send(arg_res);
  if( (argtxt[0]=='q') && argtxt[1]){  
  message.channel.messages.fetch(argtxt[1])
  .then(message =>{
      if(argtxt[2]){
        let txt_res = message.content.trim(); 
        let msg_first_q = message.author.username;
        var embed = new Discord.MessageEmbed()
            .setTitle(`${msg_first_q} dijo que:`)
            .setDescription(`${txt_res}`)
            //.addField(`${msg_first_q} dijo que:`, `${txt_res}`, true)
            .setThumbnail(message.author.avatarURL())
            .addField(`${autor_res} respondio:`, arg_res, true)
            .setColor(0x66b3ff);
        message.channel.send({ embed });
      } else{
        let txt_res = message.content.trim(); 
        let msg_first_q = message.author.username;
        var embed = new Discord.MessageEmbed()
            .setTitle(`${msg_first_q} dijo que:`)
            .setDescription(`${txt_res}`)
            //.addField(`${msg_first_q} dijo que:`, `${txt_res}`, true)
            .setThumbnail(message.author.avatarURL())
            .setColor(0x66b3ff);
        message.channel.send({ embed });
      };    
      
  })
  //message.channel.send(message.content))
  .catch(console.error);  
  }
                                              }
});


//    Add emoji name
var emojiname = ["Erika","Hiro","Sachi"];
var emojiname_toubun = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'];
var emojiname_stream = ['✅'];

//    Add role name
var rolename=["Erika-Ojousama","Team Hiro","Norteños fieles a Sachi"];
var rolename_toubun=["Las pelucas de Ichika","Nino's Train","Miku's Church","YotsuBros","Las migajas de Itsuki"];
var rolename_stream = ["Stream Grupal"];


client.on('message', msg => {
if(msg.content.startsWith(config.prefix+"CuckooTeams")){
  if(!msg.channel.guild) return;

  let role_erika = msg.guild.roles.cache.find(r => r.id === "698678366248632382");
  let role_hiro = msg.guild.roles.cache.find(r => r.id === "698678309818728571");
  let role_sachi = msg.guild.roles.cache.find(r => r.id === "698678146978938902");

  var embed = new Discord.MessageEmbed()
          .setTitle("Elección de Teams en Cuckoo's fiance")
          .setDescription(`Escoge a tu chica favorita para pertenecer a su rol \n ${role_erika}, ${role_hiro}, ${role_sachi}`)
          .setImage('https://i.imgur.com/xLmXSXS.png')
          .setColor(0x66b3ff);

  msg.channel.send({ embed: embed }).then(sentEmbed => {    
  for(let n in emojiname){
  var emoji =[msg.guild.emojis.cache.find(r => r.name == emojiname[n])];

  for(let i in emoji){
     sentEmbed.react(emoji[i])
   }
   //msg.react(emoji[i]);
 }
})
}

if(msg.content.startsWith(config.prefix+"StreamS")){

  let role_stream = msg.guild.roles.cache.find(r => r.id === "742607787749802069");

  if(!msg.channel.guild) return;

  var embed = new Discord.MessageEmbed()
          .setTitle("Streaming Semanales")
          .setDescription(`Quieres participar en las actividades del streaming semanal  \n reaccionen al emote ${emojiname_stream} para obtener el rol ${role_stream} para invocarte cada vez que iniciemos uno.`)
          .setImage('https://cdn.discordapp.com/attachments/676216138274701342/742621393291575337/prueba_Stream.png')
          .setColor(0x66b3ff);

  msg.channel.send({ embed: embed }).then(sentEmbed => {    
  for(let n in emojiname_stream){
  var emoji =[msg.guild.emojis.cache.find(r => r.name == emojiname_stream[n])];
  sentEmbed.react(emojiname_stream[n])
   //msg.react(emoji[i]);
 }
})
}

if(msg.content.startsWith(config.prefix+"ToubunTeams")){
  if(!msg.channel.guild) return;

  let role_ichika = msg.guild.roles.cache.find(r => r.id === "667235166430691330");
  let role_nino = msg.guild.roles.cache.find(r => r.id === "667233868881068042");
  let role_miku = msg.guild.roles.cache.find(r => r.id === "666143216269131779");
  let role_yotsuba = msg.guild.roles.cache.find(r => r.id === "667232469417852968");
  let role_itsuki = msg.guild.roles.cache.find(r => r.id === "667234338987048961");


  var embed = new Discord.MessageEmbed()
          .setTitle("Elección de Teams en Gotoubun no hanayome")
          .setDescription(`Escoge a tu chica favorita para pertenecer a su rol \n 1️⃣ Ichika Nakano: ${role_ichika}, \n 2️⃣ Nino Nakano: ${role_nino}, \n 3️⃣ Miku Nakano: ${role_miku}, \n 4️⃣Yotsuba Nakano: ${role_yotsuba}, \n 5️⃣ Itsuki Nakano: ${role_itsuki}`)
          .setImage('https://i.imgur.com/sKVQK0L.png')
          .setColor(0x66b3ff);

  msg.channel.send({ embed: embed }).then(sentEmbed => {    
  for(let n in emojiname_toubun){
    sentEmbed.react(emojiname_toubun[n])
   //msg.react(emoji[i]);
  }
  })
}

});

client.on("messageReactionAdd",(reaction,user)=>{
  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;
  if(reaction.message.channel.id !== "716820538940719254") return;

for(let n in emojiname){
  if(reaction.emoji.name === emojiname[n]){
    let role = reaction.message.guild.roles.cache.find(r => r.name === rolename[n]);
    reaction.message.guild.member(user).roles.add(role).catch(console.error);
  }
}

for(let n in emojiname_toubun){
  if(reaction.emoji.name === emojiname_toubun[n]){
    let role = reaction.message.guild.roles.cache.find(r => r.name === rolename_toubun[n]);
    reaction.message.guild.member(user).roles.add(role).catch(console.error);
  }
}

for(let n in emojiname_stream){
  if(reaction.emoji.name === emojiname_stream[n]){
    let role = reaction.message.guild.roles.cache.find(r => r.name === rolename_stream[n]);
    reaction.message.guild.member(user).roles.add(role).catch(console.error);
  }
}

});

client.on("messageReactionRemove",(reaction,user)=>{
  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;
  if(reaction.message.channel.id !== "716820538940719254") return;
  
  for(let n in emojiname){
  if(reaction.emoji.name === emojiname[n]){
    let role = reaction.message.guild.roles.cache.find(r => r.name == rolename[n]);   
    reaction.message.guild.member(user).roles.remove(role).catch(console.error);
    }
  }

  for(let n in emojiname_toubun){
  if(reaction.emoji.name === emojiname_toubun[n]){
    let role = reaction.message.guild.roles.cache.find(r => r.name == rolename_toubun[n]);   
    reaction.message.guild.member(user).roles.remove(role).catch(console.error);
    }
  }

  for(let n in emojiname_stream){
  if(reaction.emoji.name === emojiname_stream[n]){
    let role = reaction.message.guild.roles.cache.find(r => r.name === rolename_stream[n]);   
    reaction.message.guild.member(user).roles.remove(role).catch(console.error);
    }
  }

});

// funciones adicionales

// Mensaje diario del bot
client.on("ready", () => { 
let chtest = client.channels.cache.find(cht => cht.id === '676216138274701342');
//console.log(chtest.name);    
 setInterval(() =>{
   var embed = new Discord.MessageEmbed()
          .setTitle('Recordatorio diario: Miku es la mejor chica.')
          .setAuthor("Richard", "https://i.imgur.com/kBoCwQL.png")
          .setDescription("Este mensaje es patrocinado por la Iglesia de Miku")
          .setImage('https://i.imgur.com/NBME0UL.png')
          .setThumbnail("https://i.imgur.com/jrrL0ua.png")
          .setTimestamp()
          .setColor(0x66b3ff); 
 chtest.send({ embed: embed });
 },43200000); 
  });

// Mensaje de incorporacion de Nuevos miembros

client.on("guildMemberAdd", member =>{
  var WelChannel = client.channels.cache.find(cht => cht.id === '677278326427222030'); 
  if (!WelChannel) return;
  
  const ran1 = member.user.id;
  console.log(ran1);
  var useW =client.users.cache.find(user => user.id === ran1);
  const embed = new Discord.MessageEmbed()
          .setTitle('Taberna del debate.')
          .setAuthor("STAFF", "https://i.imgur.com/gyBgGVK.png")
          .setDescription(`Bienvenido a la taberna del debate ${member}, sientete libre de opinar lo que deseas 
y manteniendo siempre el respeto entre los miembros.`)
          .setThumbnail(`${useW.avatarURL()}`)
          .setColor(0x66b3ff)
          .setImage('https://pm1.narvii.com/6274/309490a7944b0c31db344e0319389ee48c4d0a6e_00.jpg')
          .setColor(0x66b3ff);
          WelChannel.send({ embed: embed });
  
  //console.log(member)
  //console.log(ran1)
});

// Lectura de Reacciones
client.on('message', message => {
  let argstexto = message.content.substring(config.prefix.length).split(" ");
			
    // Command handler, seen previously
    switch (argstexto[0]) {
            case 'status':{
               const content = message.content.replace('.status ', '')
                // "!status hello world" -> "hello world"

                client.user.setPresence({
                activity: {
                name: content,
                type: 0,
                          },
                                        })
            break;  
            }

            case 'clear':{
               if (message.member.hasPermission('ADMINISTRATOR')){
                  if (argstexto[1]){
                  let number_msg = Number(argstexto[1]);
                  ++number_msg;  
                  message.channel.messages.fetch({limit: number_msg}).then((results) => {
                  message.channel.bulkDelete(results)
                                                                      })
                  } else{
                    message.channel.send('Especifique el numero de mensajes a borrar');  
                  };
               } else{
                 message.channel.send('No tienes los permisos para realizar esta acción'); 
               };
              break;
            }

            case 'SCuccko': {
                    message.reply('Mikubot ahora se cerrara .\n'
                            + 'confirma con pulgar arriba o pulgar abajo');

                    // Reacts so the user only have to click the emojis
                    message.react('👍').then(r => {
                            message.react('👎');
                    });

                    // First argument is a filter function
                    message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
                            { max: 1, time: 10000 }).then(collected => {
                                    if (collected.first().emoji.name == '👍') {
                                            message.reply('cerrandose');
                                            //client.destroy();
                                    }
                                    else
                                            message.reply('Operation canceled.');
                            }).catch(() => {
                                    message.reply('Sin reacciones en 10 segundos, operacion cancelada');
                            });

                    break;
            }  
    }
});

// Codigo General

client.on('message', (message) => {
    
  let img = message.mentions.users.first()  
  
  let argstexto = message.content.substring(config.prefix.length).split(" ");
  let NickUser = message.guild.members.cache.get(message.author.id); 
  
	switch(argstexto[0]){
    
    case 'date' :
      let now = Date.now(); // timestamp of now
      if (!argstexto[1]){ 
      let createdAt = message.author.createdTimestamp; // timestamp of createdAt bot
      let age = now - createdAt; // diference between now and createdAt -> Gives you the age of the bot
      const embed = new Discord.MessageEmbed()
          .setImage(`${message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })}`)
          .setColor(0x66b3ff)
          .setFooter(`fecha de creación de cuenta de "${message.author.username}"en discord fue el ${message.author.createdAt} hace (${pm(age, {verbose: true})})`);
          message.channel.send({ embed: embed });
      }
      else{

        if (argstexto[1]==='Taberna'){
          let taberna_stamp = message.guild.createdTimestamp;
          let age_taberna = now - taberna_stamp;

          const embed = new Discord.MessageEmbed()
          .setImage(`${message.guild.iconURL({ format: "png", dynamic: true, size: 1024 })}`)
          .setColor(0x66b3ff)
          .setFooter(`fecha de creación del server "${message.guild.name}" fue el ${message.guild.createdAt} hace (${pm(age_taberna, {verbose: true})})`);
          message.channel.send({ embed: embed });
        }
        else{
          let createdUser =  img.createdTimestamp;
          let age = now - createdUser;

          const embed = new Discord.MessageEmbed()
          .setImage(`${img.avatarURL({ format: "png", dynamic: true, size: 1024 })}`)
          .setColor(0x66b3ff)
          .setFooter(`fecha de creación de cuenta de "${img.username}" en discord fue el ${img.createdAt} hace (${pm(age, {verbose: true})})`);
          message.channel.send({ embed: embed });
        };  
      };
    break;
      
    case 'rnumber':
    if (!argstexto[1]){ 
      message.channel.send('No ha ingresado limite superior')
      }
      else{
        var number = argstexto[1];
        const rnumber = Math.floor (Math.random()*number+1);
        message.channel.send(`${rnumber}`)
      };
         
    break;
      
    case 'suma' :
    if (!argstexto[1]) {
      message.channel.send('falta definir los numeros')
      } else if (!argstexto[2]) {

          message.channel.send('falta definir el segundo numero');

      } else {

          const number1 = Math.floor(argstexto[1]);
          const number2 = Math.floor(argstexto[2]);
    
      function suma(number1,number2) {
        const s=(number1+number2);
      return(s); 
    }
      const sum =suma(number1,number2);
      message.channel.send(`${sum}`) 
        
      };
      
    break;  
    
    case 'avatar':
    
      if (!img) {
          
          const embed = new Discord.MessageEmbed()
          .setImage(`${message.author.avatarURL({ format: "png", dynamic: true, size: 1024 })}`)
          .setColor(0x66b3ff)
          .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
          message.channel.send({ embed: embed });

      } else if (img.avatarURL === null) {

          message.channel.send("El usuario ("+ img.username +") no tiene avatar!");

      } else {

          message.channel.send({embed: { 
          color: 16777215, description:`Avatar de ${img.username}#${img.discriminator}`, 
          image:  {
          url: `${img.avatarURL({ format: "png", dynamic: true, size: 1024 })}`
                  }
          }});

      };
    break;  
      
    case 'slap':
    if (!argstexto[1]){ 
      return message.reply('https://i.chzbgr.com/original/6245370880/hC65A718E/');
      }else{
        message.channel.send({embed: { 
    color: 16777215, description:`${argstexto[1]} no baka`, 
    image:  {
        url: "https://i.imgur.com/JncVcyl.gif"
    }
    }});
        
      };
    break;
    
    case 'NewNick':
    if (argstexto[1]){
     message.member.setNickname(argstexto[1]) 
     }else{
     message.channel.send('No ha puesto el nuevo Nick')  
     }   
    console.log(argstexto[1])
		break;
      
      
    case 'sleep':
    if (argstexto[1]) {
      switch(argstexto[1] ){
              //.setImage('https://i.imgur.com/qPzCZVG.png')
              case 'Miku':
                message.channel.send({embed: { 
              color: 16777215, 
                  description:`Buenas noches de parte de ${message.author.username}`, 
              image:  {
                  url: "https://media.discordapp.net/attachments/605529156104618000/667522892858130432/emog_9.gif"
              }
              }
                                     });
              break;
            
              default:
                message.channel.send({embed: { 
              color: 16777215, 
                  description:`Buenas noches de parte de ${message.author.username}`, 
              image:  {
                  url: "https://media.discordapp.net/attachments/676216138274701342/681724708449943562/446.gif"
              }
              }
                                     });
            
              }
	      break;
      
    }else{
      message.channel.send({embed: { 
              color: 16777215, 
                  description:`Buenas noches de parte de ${message.author.username}`, 
              image:  {
                  url: "https://cdn.discordapp.com/attachments/676216138274701342/681724708449943562/446.gif"
              }
              }
                                     });
    }
      
    break;
        
    case 'trueRin':
    message.channel.send({embed: { 
    color: 16777215, description:`La verdadera Rin`, 
    image:  {
        url: "https://i.imgur.com/e93lzye.png"
    }
    }});
		break;
      
    case 'Question':
    message.channel.send(" Quieres recibir notificaciones sobre los Spoilers de Kakkou no iinazuke?").then(function (message) {
              message.react("👍")
              message.react("👎")
              //message.delete()
            }).catch(function() {
              //Something
             });
		break;  
      
    case 'DaleConLaSilla':
    message.channel.send({embed: { 
    color: 16777215, description:`da igual`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/676216138274701342/676265664155222047/giphy-3.gif"
    }
    }});
		break;

    case 'BadEnding':
    message.channel.send({embed: { 
    color: 16777215, description:`El final de ${argstexto[1]} es una completa mierda, cosas como estas nunca deberian existir.`, 
    image:  {
        url: "https://media.discordapp.net/attachments/676216138274701342/730280949304000523/20200707_233530.gif"
    },
    footer: {
		text: `By ${message.author.username}`,
	},
    } 
    });
    
    break;

    case 'morning':
    message.channel.send({embed: { 
    color: 16777215, description:`Buenos dias de parte de ${message.author.username}#${message.author.discriminator}`, 
    image:  {
        url: "https://i.imgur.com/QiknUK1.gif"
    }
    }});
    
    break;
      
    case 'souka': 
      message.channel.send({embed: { 
    color: 16777215, description:`Nada que hacer aqui`, 
    image:  {
        url: "https://i.imgur.com/MSOFzet.gif"
    }
    }});
		break;   
      
    case 'MikuVult':
    message.channel.send({embed: { 
    color: 16777215,title: `Que sea la voluntad de Miku`,fields: [
      {
			name: 'Latin',
			value: 'Miku deam, domina mea, ut cum gladio, et qui mane vigilant ad vestrum adprehendet vos. Conforta me et dissolutus, mihi quoque spem dedisti pauperi misericordiam paenitenti autem dat cruciatus sceleratis plerumque facit iudicium imprimis excluduntur',
			inline: true,
		},
		{
			name: 'Español',
			value: 'Diosa Miku , mi señora,consigue con mi espada,que aquellos que te buscan te encuentren. Dame fuerza para los desalentados,dame esperanza para los oprimidos,dame misericordia para los arrepentidos , pero  sobre todo da tormento para los perversos y ante todo da justicia a los excluidos',
			inline: true,
		},
	], description: 'Plegarias',
	thumbnail: {
		url: 'https://i.imgur.com/3EfzAxS.png',
	},
    image:  {
        url: "https://i.imgur.com/Ktmpy4K.png"
    },
      footer: {
		text: `esta cruzada fue promulgada por  ${message.author.username}#${message.author.discriminator}`
	}
    }});
    //const embed3 = new Discord.RichEmbed()
    //      .setTitle('Que sea la voluntad de Miku')
    //      .setImage('https://i.imgur.com/3EfzAxS.png')
    //      .setColor(0x66b3ff)
          //.addField('latin','Miku deam, domina mea, ut cum gladio, et qui mane vigilant ad vestrum adprehendet vos. Conforta me et dissolutus, mihi quoque spem dedisti pauperi misericordiam paenitenti autem dat cruciatus sceleratis plerumque facit iudicium imprimis excluduntur', true)
          //.addField('Español','Diosa Miku , mi señora,consigue con mi espada,que aquellos que te buscan te encuentren. Dame fuerza para los desalentados,dame esperanza para los oprimidos,dame misericordia para los arrepentidos , pero  sobre todo da tormento para los perversos y ante todo da justicia a los excluidos', true)
    //      .setFooter(`esta cruzada fue promulgada por  ${message.author.username}#${message.author.discriminator}`);
    //      message.channel.send({ embed3 }); 
		break;    
      
	  case 'hola':
		message.channel.send('Hola soy Miku la waifubot de pruebas :D');
		break;
    case 'angry':
		message.channel.send('!!!!!!!');
    message.channel.send('https://i.imgur.com/L8EGJAv.gif')
		break;  
    case 'beer':
		message.channel.send('Sin miedo =)');
    message.channel.send('https://i.imgur.com/Oe6TxbP.png')
		break;  
    case 'padoru':
		message.channel.send('hashire sori yokaze no you ni tsukimihara wo, PADORU PADORU');
    message.channel.send('https://i.imgur.com/0uCqLWb.gif')
		break;  
	  case 'MikuBestGirl':
		message.channel.send('arigatou...');
		message.channel.send('https://media1.tenor.com/images/c4b3ed36eb2119b6921a7b8858fc155c/tenor.gif?itemid=13320232');
	    break;
	  case 'muda':
		message.reply('uhhhhh..') 
		message.channel.send('https://media1.tenor.com/images/b8bbcc95b7f550dc1707377ad70b0db5/tenor.gif?itemid=13405567');
		break;
	  case 'Hail':
		if (!argstexto[1]) return message.reply('No waifu detectada https://i.imgur.com/aFqNHK9.png');
		switch(argstexto[1] ){
        
			case 'Bonnie':
      var BonnieUser = message.guild.members.cache.get("393827947632525313");    
       message.channel.send({embed: { 
    color: 16777215, 
        description:`Todo la gloria a la comunity manager ${BonnieUser} y que su sacrificio por spamear en el otro server, ganandose el derecho de ser la waifu oficial del server.`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/676216138274701342/679543579831828518/PicsArt_01-31-12.35.41.gif"
            }
    }
                           }); 
			break;
			case 'Ichika':
			//message.channel.sendMessage('waifu equivocada')
			//message.channel.sendMessage('https://pa1.narvii.com/7129/988461aa59487d4d3343e59642f838f0787dbb6cr1-600-338_hq.gif')
			message.channel.send('No debes tomar decisiones de las que puedas arrepentirte ... porque las cosas podrían no continuar como siempre')
      message.channel.send('>Miku e Ichika discuten sobre ser la pareja de baile de Fuutarou, Capítulo 27');
			message.channel.send('https://pa1.narvii.com/7180/3b9090a931dddb5d8606271496d424ade83765cdr1-320-181_hq.gif');
			break;
			case 'Yotsuba':
			message.channel.send('Al fin me miraste');
			message.channel.send('https://i.redd.it/uqkcxj599ju21.gif');
			break;
			case 'Nino':
    message.channel.send({embed: { 
    color: 16777215, 
        description:`bakaaa`, 
    image:  {
        url: "https://preview.redd.it/fuve1boo5ai21.gif?overlay-align=bottom,left&crop=500:261.780104712,smart&overlay-height=15p&overlay=%2Fwatermark%2Ft5_4deoo.png%3Fs%3D6ff4222873207dd59b95a31418c87ea5576ada9b&width=500&height=261.780104712&s=7f6e1222b38bcd5db9bc77216fc460214ef1b316"
            }
    }
                           }); 
      break;
        
      case 'Sakura':
    message.channel.send({embed: { 
    color: 16777215, 
        description:`eso no esta bien ${message.author.username}-sempai`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/585138713739132941/703621108481654804/a2ae1e336ca21026f8bbe838bcd01aaaae180244_hq.gif"
            }
    }
                           }); 
      break;

      case 'Sachi':
    message.channel.send({embed: { 
    color: 16777215, 
        description:`La reina en el norte, aqui tu fiel seguidor ${NickUser.displayName} presentandose a tu servicio.`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/605593247041060920/732798775353016351/DoItForHer_Sachi.png"
            }
    }
                           }); 
      break;  
        
      case 'Miku':
			message.channel.send({embed: { 
    color: 16777215, 
        description:`ahhh`, 
    image:  {
        url: "https://media1.tenor.com/images/c4b3ed36eb2119b6921a7b8858fc155c/tenor.gif?itemid=13320232"
            }
    }
                           }); 
			break; 
        
      case 'Illya':
			message.channel.send({embed: { 
    color: 16777215, 
        description:`${NickUser.displayName} onii-chan`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/585138713739132941/685678007020814360/6682df116369f35d1d5c5d26bc451bd9.gif"
            }
    }
                           }); 
			break;    
        
      case 'Kaori':
			message.channel.send({embed: { 
    color: 16777215, 
        description:`gracias por no olvidarte de mi ${NickUser.displayName}`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/656672395066867734/722360269304496181/c4b028350923329b5a541a3f932cd37a655532a0_00.gif"
            }
    }
                           }); 
			break;      
        
      case 'Musashi':
      const emoji_love = client.emojis.find(emoji => emoji.name === "Miku_love");
			message.channel.send({embed: { 
    color: 16777215, 
        description:`que hermosa ${emoji_love}`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/608315054479376416/681635014818922517/20200224_165351.gif"
            }
    }
                           });
        message.channel.send({embed: { 
    color: 16777215, 
        description:`que hermosa ${emoji_love} ${emoji_love}`, 
    image:  {
        url: "https://media.discordapp.net/attachments/608315054479376416/681641111726587919/20200224_171738.gif"
            }
    }
                           }); 
        message.channel.send({embed: { 
    color: 16777215, 
        description:`que hermosa ${emoji_love} ${emoji_love} ${emoji_love}`, 
    image:  {
        url: "https://media.discordapp.net/attachments/608315054479376416/681641125248761861/20200224_171813.gif"
            }
    }
                           }); 
			break;    

      case 'Astolfo':
      message.channel.send({embed: { 
    color: 16777215, 
        description:`ara, ara, no te has olvidado de mi master ${message.author.username}`, 
    image:  {
        url: "https://i.imgur.com/gLsFarY.gif"
            }
    }
                           }); 
			break;
        
      case 'Stella':
      message.channel.send({embed: { 
    color: 16777215, 
        description:`no te olvides de mi baka!!!!!!`, 
    image:  {
        url: "https://media1.tenor.com/images/e703e609643ce57b267b96bdd4cfeffc/tenor.gif?itemid=12626274"
            }
    }
                           }); 
			break;  
      
      case 'Itsuki':
      message.channel.send({embed: { 
    color: 16777215, 
        description:`Que nunca nos falte la comida ${message.author.username}, amén`, 
    image:  {
        url: "https://i.imgur.com/3JPv57l.gif"
            }
    }
                           }); 
			break;
        
      case 'Saber':
      message.channel.send({embed: { 
    color: 16777215, 
        description:` Happy to see you master ${message.author.username}`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/605529156104618000/671938856333082644/tenor-5.gif"
            }
    }
                           }); 
			break;    
        
      case 'Komi':
      message.channel.send({embed: { 
    color: 16777215, 
        description:`... (ella dice gracias)`, 
    image:  {
        url: "https://i.imgur.com/vmX2Hi6.gif"
            }
    }
                           }); 
			break;    
        
      case 'Juanita':
      //console.log(NickUser)  
      message.channel.send({embed: { 
    color: 16777215, 
        description:`Esta empezando hacer calor :fire: master ${NickUser.displayName}, vamonos`, 
    image:  {
        url: "https://cdn.discordapp.com/attachments/676216138274701342/676265315633594388/1547411106_original.gif"
            }
    }
                           }); 
			break;      
        
      case 'Rin':
			message.channel.send({embed: { 
    color: 16777215, 
        description:`Lovely to see you ${NickUser.displayName}`, 
    image:  {
        url: "https://i.imgur.com/LODbJAI.gif"
    }
    }
                           });
			break;      
        
		}
	   break;
      
    case 'Puchero':
		if (!argstexto[1]) return message.reply('No waifu detectada https://i.imgur.com/aFqNHK9.png');
		switch(argstexto[1] ){
			case 'Miku':
			message.channel.sendMessage('https://imgur.com/bvrDYqu');
			break;
			case 'Ichika':
			message.channel.sendMessage('https://imgur.com/hBxftzn');
			break;
			case 'Yotsuba':
			message.channel.sendMessage('https://imgur.com/dEAY03T');
			break;
			case 'Nino':
			message.channel.sendMessage('https://imgur.com/A3J39LL');
			break;
      case 'Itsuki':
			message.channel.sendMessage('https://imgur.com/LUAztR3');
			break;
      case 'Astolfo':
			message.channel.sendMessage('https://i.imgur.com/oedtx22.gif');
			break;  
		}
	   break;
	}
	if (message.content == ';.numerorandom') {
		var rand1 = Math.round(Math.random()*100);
		message.channel.sendMessage('Numero random: ' + rand1);
	}
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  
 if(command === 'help'){
                   
 const embed = new Discord.RichEmbed()
.setThumbnail(client.user.avatarURL)
.setAuthor("MikuBot" , client.user.avatarURL)
.setTitle("Comandos MikuBot")
.setDescription(".help informacion general del bot\n.hola te responde forma casual\n .MikuBestGirl sonrojo\n .muda Miku te desea la muerte \n.Hail nombre_waifu(Mayuscula 1era Letra) \n.Puchero nombre_waifu(Mayuscula 1era Letra) \n.padoru cancion padoru \n.beer Hasta el fondo onichan \n.slap @nombre_usuario/usuario \n.avatar @User \n.angry Miku se molesta gif \n.morning Gif cute de Miku despertando \n.sleep Imagen de Miku durmiendose ") //\n <-- enter
 //.addField("subtitulo", "texto del subtitulo")
 //.setFooter("mini descripcion")
 .setTimestamp() //<-- indicador de tiempo
 .setColor(0x66b3ff)
  message.channel.send({ embed })

 }

  
});
// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it 
// feature to hide the token we got earlier. 
client.login(process.env.DISCORD_TOKEN);