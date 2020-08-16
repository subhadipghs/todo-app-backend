
function name(v) {
	return /^[A-Za-z\s\']+$/.test(v);
}

module.exports = name;