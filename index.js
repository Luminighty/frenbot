const Discord = require("discord.js");
const util = require("util");
const misc = require("./misc");
const consts = require("./consts");
const commands = require("./command");

const bot = new Discord.Client({
	presence: {
		status: "online",
		activity: {
			name: "frens play",
			type: "WATCHING",
		}
	}, partials: ['MESSAGE', 'REACTION'],
});


bot.on("ready", function() {
	console.log(`${bot.user.username} is online!`);
});

bot.login(process.env.token);


bot.on("message", message => {
	commands.parseMessage(message);
});


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


commands.addRoleToggle(["q", "queue", "lfg"], consts.roles.LFG);
commands.addRoleToggle(["eu"], consts.roles.region.EU);
commands.addRoleToggle(["us"], consts.roles.region.US);
commands.addRoleToggle(["au"], consts.roles.region.AU);

commands.addRoleToggle(["impostor", "imposter"], consts.roles.impostor);
commands.addRoleToggle(["crewmate", "crew"], consts.roles.crewmate);



commands.add(["code"], async (args, message) => {
	if (args.length < 1) {
		message.channel.send("!code ABCDEF");
		return;
	}

	const main = message.guild.channels.cache.find((channel) => channel.id === channels.MainVoice);
	await main.setName(args.join(" "));
});