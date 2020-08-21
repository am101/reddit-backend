const mongoose = require('mongoose');
const { date, string } = require('@hapi/joi');

const dateNow = new Date().toDateString();

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 4,
		max: 20
	},

	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024
	},
	firstname: String,
	lastname: String,
	registerdat: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
