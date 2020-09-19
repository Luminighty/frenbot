exports.findRole = async function(guild, id) {
	return guild.roles.cache.find((role) => role.id == id);
};


exports.toggleRole = async function(member, roleId) {
	const role = member.guild.roles.cache.find(role => role.id === roleId);
	if (member.roles.cache.some(role => role.id === roleId)) {
		await member.roles.remove(role);
		return false;
	} else {
		await member.roles.add(role);
		return true;
	}
};