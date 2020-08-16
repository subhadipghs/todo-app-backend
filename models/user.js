const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { validator } = require("../helpers/validators");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		validate: {
			validator: function (v) {
				return validator.name(v);
			},
			message: `Invalid name`,
		},
		required: [true, "Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		validate: {
			validator: function (v) {
				return validator.email(v);
			},
			message: `Invalid email`,
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		validate: {
			validator: function (v) {
				return v.length >= 8 ? true : false;
			},
			message: (props) => `Password must be greater than 8 characters`,
		},
	},
	todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todos" }],
});

// Hash the password before saving in the document
UserSchema.pre("save", function (next) {
	try {
		this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
		next();
	} catch (e) {
		console.error(e);
	}
});

module.exports = mongoose.model("User", UserSchema);
