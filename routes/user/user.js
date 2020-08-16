const express = require("express");
const jwt = require("jsonwebtoken");
const { getSaltSync, hashSync, compareSync } = require("bcryptjs");
const userRoute = express.Router();
const User = require("../../models/user");

userRoute.post("/signup", async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const ifExistingUser = await User.findOne({ email }).exec();

		if (ifExistingUser) {
			return res.json({
				success: false,
				message: "Email already exists",
			});
		}

		const user = new User({ name, email, password });
		await user.save();

		const token = jwt.sign({ user: user._id }, process.env.SECRET);
		return res.json({
			success: true,
			message: "User signup successful",
			user: user.name,
			token: token,
		});
	} catch (error) {
		next(error);
	}
});

userRoute.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).exec();

		if (!user) {
			return res.json({
				success: false,
				message: "user doesn't exists",
			});
		} else {
			const validUser = compareSync(password, user.password);

			if (!validUser) {
				return res.status(401).json({
					success: false,
					message: "Invalid username or password",
				});
			}

			const userId = { user: user._id };

			const token = jwt.sign(userId, process.env.SECRET);

			return res.json({
				success: true,
				message: "Logged in successful",
				user: user.name,
				token: token,
			});
		}
	} catch (error) {
		next(error);
	}
});

module.exports = userRoute;
