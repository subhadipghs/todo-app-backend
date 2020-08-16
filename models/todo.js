const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
	todoItem: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default : Date.now,
	},
	user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Todo", TodoSchema);
