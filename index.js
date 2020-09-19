const Discord = require("discord.js");

const bot = new Discord.Client({
	presence: {
		status: "online",
		activity: {
			name: "frens play",
			type: "WATCHING",
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
	try {
	if (command in commands)
		commands[command](args, message);
	} catch (err) {
		console.log(err);
	}
});

const commands = {
	"q": queue, "queue": queue,
};

/**
 * 
 * @param {*} args 
 * @param {Discord.Message} message 
 */
async function queue(args, message) {
	const role = message.guild.roles.cache.find(role => role.name === 'LFG');
	if (!message.member.roles.cache.some(role => role.name === 'LFG')) {
		await message.member.roles.add(role);
		await message.channel.send({ content: "Role added!"});
	} else {
		await message.member.roles.remove(role);
		await message.channel.send({ content: "Role removed!"});
	}
}

