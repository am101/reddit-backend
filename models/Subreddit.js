const mongoose = require('mongoose');

const subredditSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	moderators: Array,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Subreddit', subredditSchema);
