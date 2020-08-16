require('dotenv').config();
const mongoose = require("mongoose");

module.exports = async (uri) => {
	try {
		await mongoose.connect(process.env.MONGO_URI || uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		});
		console.log("MongoDB is connected");
	} catch (error) {
		console.error(error);
	}
};
