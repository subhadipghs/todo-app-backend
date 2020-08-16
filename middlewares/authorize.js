require('dotenv').config();
const jwt = require('jwt');

async function authorize(req, res, next) {
	try {
		const authHeader = req.headers['Authorization'];
		const token = authHeader && authHeader.split(" ")[1];
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Authentication failed"
			});
		}
		const decoded = await jwt.verify(token, process.env.SECRET);

		req.user = decoded;
		next();

	} catch(error) {
		return res.sendStatus(403).json({
			success: false,
			message: "Authorization Failed"
		});
	}
}

module.exports = authorize;
