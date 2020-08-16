module.exports = (error, req, res, next) => {
	const statusCode = req.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode);
	console.error("Error : ", error);
	return res.json({
		success: false,
		message:
			process.env.NODE_ENV === "production"
				? "Something went wrong"
				: error.message,
	});
};
