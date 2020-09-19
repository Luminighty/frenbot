const discord = require("discord.js");
const commands = {};

/**
 * @callback Command
 * @param {String[]} args 
 * @param {discord.Message} member 
 */

/**
 * 
 * @param {String[]} name 
 * @param {Command} func 
 */
exports.add = function(name, func) {
	for (const key of name) 
		commands[key] = func;
};


exports.addRoleToggle = function (name, roleId, addedMsg = "Role added!", removedMsg = "Role removed!") {
	exports.add(name, async (args, message) => {
		const content = (await misc.toggleRole(message.member, roleId)) ?
				addedMsg : removedMsg;
		
		change_msg = await message.channel.send({ content });
		await util.promisify(setTimeout(5000));
		await change_msg.delete();
		await message.delete();
	});
};

exports.parseMessage = function(message) {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	try {
	if (command in commands)
		commands[command](args, message);
	} catch (err) {
		console.log(err);
	}
};