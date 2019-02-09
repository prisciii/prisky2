const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const client = new Discord.Client();

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp:[]}).write()

const prefix = "§";

bot.on("ready", function() {  
  bot.user.setPresence({ game: { name: "essayer de modérer" }, status: 'online' })
    console.log("Bot de Prisciii prêt!");
});
// Quand le bot se connecte il dit ça dans la console

bot.on("message", message => {
  
    var cont = message.content;

    if(cont.startsWith(prefix + "say")) {
        message.delete(100); // le message se retire au bout de 1 seconde
		message.channel.send(message.content.slice(4, message.content.lenght)); // il reprend le msg de l'auteur pour le mettre dans le channel, sauf que là c'est lui qui parlera
		console.log("> Say : " + message.author.username) // pour voir qui a say
    }
 
});

bot.login("NTE1NDE0MTE0NDY2NjYwMzY0.DzdMWQ.p0idQf32QiztB5bM5WNRhPj_QwA");

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if(!channel) return;
    // Send the message, mentioning the member
    channel.send(`bienvenue sur le serveur, ${member}`);
  })

  bot.on("message", message => {

    var cont = message.content;

    if(cont.startsWith(prefix + "avatar")) {
        message.delete(100); // le message se retire au bout de 1 seconde
        message.channel.send(message.author.avatarURL) ;
    }
});

bot.on('message', message => {
    // Ignore messages that aren't from a guild
    if(!message.guild) return;
  
    // If the message content starts with "§kick"
    if(message.content.startsWith('§kick')) {
        message.delete(100); // le message se retire au bout de 1 seconde
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if(user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if(member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member.kick('Optional reason that will display in the audit logs').then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`cet utilisateur à été kick ${user.tag}`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('j ai été incapable de kick cet utilisateur');
            // Log the error
            console.error(err);
          });
        } else{
          // The mentioned user isn't in this guild
          message.reply('cette utilisateur est/n est pas un guild!');
        }
      // Otherwise, if no user was mentioned
      } else{
        message.reply('il faut que tu mentionnes un utilisateur!');
      }
    }
  });
  
  bot.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // if the message content starts with "§ban"
    if(message.content.startsWith('§ban')) {
        message.delete(100); // le message se retire au bout de 1 seconde
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if(user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if(member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
           */
          member.ban({
            reason: 'They were bad!',
          }).then(() => {
            // We let the message author know we were able to ban the person
            message.reply(`cet utilisateur à été banni... ${user.tag}`);
          }).catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply('tu ne peux pasban cet utilisateur');
            // Log the error
            console.error(err);
          });
        } else{
          // The mentioned user isn't in this guild
          message.reply('That user isn\'t in this guild!');
        }
      } else{
      // Otherwise, if no user was mentioned
        message.reply('veuillez mentionnez un utilisateur svp!');
      }
    }
  });

  bot.on('message', message => {
    // si le message est "§help"
    if(message.content === '§help') {
  
      var help_embed = new Discord.RichEmbed()
      .setColor("#CC0066")
      .setDescription("ceci sont mes commandes :D")
      .setThumbnail(message.author.avatarURL)
      .addField("prefix", "§")
      .addField("commandes", "kick,ban,say,helpKick,helpBan,helpSay")
      .addField("Nom des commandes (Commandes modérations)", "`contenu`, `contenu`...")
      .setTimestamp()
      message.channel.send(help_embed)

    }
  });

  bot.on('message', message => {
    // si le message est "§helpKick"
    if(message.content === '§helpKick') {
  
      var help_embed = new Discord.RichEmbed()
      .setColor("#CC1000")
      .setDescription("voila ta demande d'aide pour kick")
      .setThumbnail(message.author.avatarURL)
      .addField("prefix", "§")
      .addField("Explication", "tu dois mettre ce prefix au début de tes commandes § puis mettre la commande pour demander pour plus d'aide fais §help puis mentionnez l'utilisateur et votre raison")
      .addField("Nom des commandes (Commandes modérations)", "`contenu`, `contenu`...")
      .setTimestamp()
      message.channel.send(help_embed)

    }
  });

  bot.on('message', message => {
    // si le message est "§helpBan"
    if(message.content === '§helpBan') {
      var help_embed = new Discord.RichEmbed()
      .setColor("#CC0000")
      .setDescription("voila ta demande d'aide pour ban")
      .setThumbnail(message.author.avatarURL)
      .addField("prefix", "§")
      .addField("Explication", "tu dois mettre ce prefix au début de tes commandes § puis mettre la commande pour demander pour plus d'aide fais §help puis mentionnez l'utilisateur et votre raison")
      .addField("Nom des commandes (Commandes modérations)", "`contenu`, `contenu`...")
      .setTimestamp()
      message.channel.send(help_embed)

    }
  });

  
  bot.on('message', message => {
    // si le message est "§helpSay"
    if(message.content === '§helpSay') {
      var help_embed = new Discord.RichEmbed()
      .setColor("#CC0022")
      .setDescription("voila ta demande d'aide pour ban")
      .setThumbnail(message.author.avatarURL)
      .addField("prefix", "§")
      .addField("Explication", "tu dois mettre ce prefix au début de tes commandes § puis mettre la commande pour demander pour plus d'aide fais §help puis mettre un message de votre choix")
      .addField("Nom des commandes (Commandes modérations)", "`contenu`, `contenu`...")
      .setTimestamp()
      message.channel.send(help_embed)

    }
  });
