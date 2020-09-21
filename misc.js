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


exports.timeout = function(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
};

exports.random = function(min, max) {
	const delta = max - min;
	return Math.floor(Math.random() * delta) + min;
}