const Discord = require('discord.js');
const sparkclient = new Discord.Client();
const ddiff = require('return-deep-diff');
const token = 'NDU1ODcxMjU2MDE3ODk1NDI0.DgCStw.yXzQI8LWnQK92XkzSyY9INccH_o';
const chalk = require('chalk');
var prefix = '~'

sparkclient.on('ready', () => {
    console.log(chalk.greenBright.bold('Spark Bot is now Running!'));
});

sparkclient.on('guildMemberUpdate', (oldMember, newMember) => {
    console.log(ddiff(oldMember, newMember));
});

sparkclient.on('guildBanAdd', (guild, user) => {
    sparkclient.channels.get('456560247298064404').send(`${user.username} was just banned`)
});  

sparkclient.on('guildBanRemove', (guild, user) => {
    sparkclient.channels.get('456560247298064404').send(`${user.username} was just unbanned`)
});  

sparkclient.on('guildDelete', guild => {
    console.log(`I have left ${guild.name} at ${new Date()}`)
});

sparkclient.on('guildCreate', guild => {
    console.log(`I have joined ${guild.name} at ${new Date()}`)
});

sparkclient.on('guildMemberAdd', member => {
    sparkclient.channels.get('456599973178638339').send(`    
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬    
Welcome to **${member.guild.name}**, **${member}**
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Hey! Are you looking for an amazing community with tons of giveaways and fun? Well this is the discord for you!
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**Unique Features:**

✧ Looking for Staff
✧ Growing Community
✧ Partnering with Servers
✧ Instant invite reward Payout, no scam, cash out whenever!
✧ Free Stuff
✧ Daily Giveaways
✧ Friendly and Unbiased Staff

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Owned by SaltySpark
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

    `);
    //member.addRole('454078889665495051')
    if(member.user.id == '427530949505581056') {
        member.addRole('454082932005404697')
    }

});

sparkclient.on('message', message => {
    
    if(message.author.bot) return;
    if(message.content.startsWith(prefix)){

        if(message.content == prefix + 'SaltySpark is the best'){
            message.channel.sendMessage('Your right for once....');
        }
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const sparkcommand = args.shift().toLowerCase();

        if(sparkcommand == 'ping'){
            message.channel.sendMessage(`Pong! \`${Date.now() - message.createdTimestamp} ms\` `)
        }
        else if(sparkcommand == 'help') {
            message.channel.sendMessage('Hey! I\'m Spark\'s bot. How can I help you? (Created by SaltySpark#1719)')
        }
        else if(sparkcommand == 'send'){
            argoutput = args.join(' ');
            sparkclient.channels.get('454081743734046721').sendMessage(argoutput);
        }
        else if(sparkcommand == 'inviter'){
            message.channel.sendMessage(message.author.inviter);
        }
        else if(sparkcommand == 'saltysparkisbad'){
            message.channel.sendMessage('YOUR DEAD!!!');
        }
        else if(sparkcommand == 'status'){
            argoutput = args.join(' ');
            sparkclient.user.setGame(argoutput);
        }
        else if(sparkcommand == 'roleadd' && message.member.hasPermission('ADMINISTRATOR') == true){
            var roleName = args[0];
            var roleColor = args[1];
            if(roleName == null || roleColor == null){
                message.channel.send('Please use the command in the correct format: \`~roleadd (Role Name) (Role Color)\`')
            }
            else{
            message.guild.createRole({name: roleName, color: roleColor})
            message.channel.send(roleName + 'was created with the color' + roleColor);
            }
        }
        else{
            message.channel.sendMessage('**ERROR:** I cannot do this function yet');
        }
    }
    else{
        return;
    }


});

sparkclient.on('channelCreate', (channel) => {
    if(channel.type === 'text') {
        console.log(`A text channel by the name of ${channel.name} and was created ${channel.createdAt} with the ID of ${channel.id}`)
        channel.send(`You were successful in creating this channel`);
    }
    else{
        sparkclient.channels.get('456560247298064404').send(`A voice channel by the name of ${channel.name} and was created ${channel.createdAt} with the ID of ${channel.id}`)
    }
});

sparkclient.on('disconnect', () => {
    console.log(`You have been disconnected at ${new Date()}`);
});

sparkclient.on('reconnecting', () => {
    console.log(`You are reconnecting at ${new Date()}`);
});

var nToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
sparkclient.on('debug', debugString =>{
    console.log(chalk.cyan(debugString.replace(nToken, 'that was redacted')));
});
sparkclient.on('error', errorString =>{
    console.log(chalk.red(errorString.replace(nToken, 'that was redacted')));
});
sparkclient.on('warn', warnString =>{
    console.log(chalk.yellow(warnString.replace(nToken, 'that was redacted')));
});

sparkclient.login(token);
