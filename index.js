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

const roles = {
	LFG: 756927331246800966,
	region: {
		message: 756942274742452274,
		EU: 756920658088427601,
		AU: 756920636135440466,
		US: 756920607630688276,
	},
};

const server = 756916913774395443;

const channels = {
	MainVoice: 756916914655330379,
};

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

function findRole(guild, id) {
	return guild.roles.cache.find((role) => role.id == id);
}

bot.on("messageReactionAdd", (reaction, user) => {
	const mainGuild = bot.guilds.cache.find((guild) => guild.id == server);
	const member = mainGuild.members.cache.find((user) => user.id == user.id);
	console.log(reaction.message.id);
	if (reaction.message.id == roles.region.message) {
		console.log(reaction.emoji.name);
		switch (reaction.emoji.name) {
			case "flag_eu": member.roles.add(findRole(roles.region.EU)); break;
			case "flag_us": member.roles.add(findRole(roles.region.US)); break;
			case "flag_au": member.roles.add(findRole(roles.region.AU)); break;
		} 
	}
});

bot.on("messageReactionRemove", reaction => {
	const mainGuild = bot.guilds.cache.find((guild) => guild.id == server);
	const member = mainGuild.members.cache.find((user) => user.id == user.id);
	if (reaction.message.id == roles.region.message) {
		switch (reaction.emoji.name) {
			case "flag_eu": member.roles.remove(findRole(roles.region.EU)); break;
			case "flag_us": member.roles.remove(findRole(roles.region.US)); break;
			case "flag_au": member.roles.remove(findRole(roles.region.AU)); break;
		} 
	}
});

const commands = {};

/**
 * @callback Command
 * @param {String[]} args 
 * @param {Discord.Message} member 
 */

/**
 * 
 * @param {String[]} name 
 * @param {Command} func 
 */
function addCommand(name, func) {
	for (const key of name) 
		commands[key] = func;
}



addCommand(["q", "queue"], async (args, message) => {
	const role = message.guild.roles.cache.find(role => role.name === 'LFG');
	if (!message.member.roles.cache.some(role => role.name === 'LFG')) {
		await message.member.roles.add(role);
		await message.channel.send({ content: "Role added!"});
	} else {
		await message.member.roles.remove(role);
		await message.channel.send({ content: "Role removed!"});
	}
});

addCommand(["code"], async (args, message) => {
	if (args.length < 1) {
		message.reply("!code ABCDEF");
		return;
	}
	const main = message.guild.channels.cache.find((channel) => channel.id == channels.MainVoice);
	console.log(main);
	await main.setName(args[0]);
});