//require the discord.js
const Discord = require('discord.js');

//create a new Discord client
const client = new Discord.Client();

const { prefix, token } = require('./config.json');
//when the client is ready, this event
//will be triggered one time after logging in
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
   
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    //some basic commands to see whether the bot works
    if (commandName === 'ping') {
        message.channel.send('Pong!');
    } else if (commandName === 'beep') {
        message.channel.send('Boop!');
    //returns server's name
    } else if (commandName === 'server') {
        message.channel.send(`This server's name is: ${message.guild.name} \nTotal members: ${message.guild.memberCount}`);
    //returns the user's information
    } else if (commandName === 'user-info') {
        message.channel.send(`Your username: ${message.author.username}`);
    //mentions the name of the member being kicked
    } else if (commandName === 'kick') {
        
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!')
        }

        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    
    //returns a link to the image of the user's avatar 
    } else if (commandName === 'avatar') {
        
        if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
    } 
});

//login to Discord with your app's token
client.login(token);
