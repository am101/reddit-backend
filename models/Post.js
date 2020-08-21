const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: String,
    images: String,
    subreddit: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    createdat: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);
