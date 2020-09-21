const Discord = require("discord.js");
const util = require("util");
const misc = require("./misc");
const consts = require("./consts");
const commands = require("./command");

const bot = new Discord.Client({
	presence: {
		status: "online",
		activity: RandomActivity()
	}, partials: ['MESSAGE', 'REACTION'],
});

function RandomActivity() {
	const activities = [
		{name: "frens play", type: "WATCHING"},
		{name: "helping frens", type: "CUSTOM_STATUS"},
		{name: "Waiting for frens to play with", type: "CUSTOM_STATUS"},
		{name: "alone", type: "PLAYING"},
		{name: "frens", type: "LISTENING"},
	];
	return activities[misc.random(0, activities.length)];
}

bot.on("ready", function() {
	console.log(`${bot.user.username} is online!`);
	setInterval(() => {
		bot.user.setActivity(RandomActivity());
	}, 3600000);
});

bot.login(process.env.token);

bot.on("message", message => {
	commands.parseMessage(message);
});


bot.on("messageReactionAdd", async (reaction, user) => {
	if (user.id == bot.user.id)
		return;
	const mainGuild = bot.guilds.cache.find((guild) => guild.id == consts.server);
	const member = mainGuild.members.cache.find((_user) => _user.id == user.id);
	if (reaction.message.id == consts.roles.region.message) {
		let role;
		switch (reaction.emoji.name) {
			case '🇪🇺': role = consts.roles.region.EU; break;
			case "🇺🇸": role = consts.roles.region.US; break;
			case "🇦🇺": role = consts.roles.region.AU; break;
		}
		if (role)
			await member.roles.add(await misc.findRole(mainGuild, role));
	}
});

bot.on("messageReactionRemove", async (reaction, user) => {
	const mainGuild = bot.guilds.cache.find((guild) => guild.id == consts.server);
	const member = mainGuild.members.cache.find((_user) => _user.id == user.id);
	if (reaction.message.id == consts.roles.region.message) {
		let role;
		switch (reaction.emoji.name) {
			case '🇪🇺': role = consts.roles.region.EU; break;
			case "🇺🇸": role = consts.roles.region.US; break;
			case "🇦🇺": role = consts.roles.region.AU; break;
		}
		if (role)
			await member.roles.remove(await misc.findRole(mainGuild, role));
	}
});


commands.addRoleToggle(["q", "queue", "lfg"], consts.roles.LFG);
commands.addRoleToggle(["eu"], consts.roles.region.EU);
commands.addRoleToggle(["us"], consts.roles.region.US);
commands.addRoleToggle(["au"], consts.roles.region.AU);
commands.addRoleToggle(["active", "online"], consts.roles.active);

commands.addRoleToggle(["impostor", "imposter"], consts.roles.impostor);
commands.addRoleToggle(["crewmate", "crew"], consts.roles.crewmate);



commands.add(["code"], async (args, message) => {
	if (args.length < 1) {
		message.channel.send("!code ABCDEF");
		return;
	}

	const main = message.guild.channels.cache.find((channel) => channel.id === consts.channels.MainVoice);
	await main.setName(args.join(" "));
	const reply = await message.channel.send("Lobby code updated!");
	await misc.timeout(30000);
	await message.channel.bulkDelete([reply, message]);
});


commands.add(["clear"], async (args, message) => {
	const members = message.guild.members.cache.filter((member) => member.roles.cache.has(consts.roles.LFG));
	const lfgRole = await misc.findRole(message.guild, consts.roles.LFG);
	const promises = members.map((member) => new Promise((res, rej) => {
		member.roles.remove(lfgRole);
		res();
	}));
	await Promise.all(promises);
	const removed_Message = await message.channel.send({content: "LFG roles removed!"});
	await misc.timeout(5000);
	await message.channel.bulkDelete([removed_Message, message]);
});