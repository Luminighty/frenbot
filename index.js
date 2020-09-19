const Discord = require("discord.js");

const bot = new Discord.Client();

const prefix = "!";

bot.on("ready", function() {
	console.log(`${bot.user.username} is online!`);
});

bot.login(process.env.token);


bot.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = mesage.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


});

const commands = {
	"q": queue, "queue": queue,
};

/**
 * 
 * @param {*} args 
 * @param {Discord.Message} message 
 */
function queue(args, message) {
	const role = message.guild.roles.cache.find(role => role.name === 'LFG');
	if (message.member.roles.cache.some(role => role.name === 'LFG')) {
		message.member.roles.add(role);
	} else {
		message.member.roles.remove(role);
	}
}

