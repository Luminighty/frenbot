const Discord = require("discord.js");

const bot = new Discord.Client({
	presence: {
		status: "online",
		activity: {
			name: "Helping frens",
			type: "CUSTOM_STATUS",
		}
	}
});

const prefix = "!";

bot.on("ready", function() {
	console.log(`${bot.user.username} is online!`);
});

bot.login(process.env.token);


bot.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command in commands)
		commands[command](args, message);
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
	
	console.log("queue");
	const role = message.guild.roles.cache.find(role => role.name === 'LFG');
	console.log("found role");
	if (!message.member.roles.cache.some(role => role.name === 'LFG')) {
		console.log("doesn't have role role");
		message.member.roles.add(role);
	} else {
		console.log("have role role");
		message.member.roles.remove(role);
	}
	console.log("stop");
}

