const router = require("express").Router();
const jwt = require('jsonwebtoken');

const verifyToken = require("../config/verifyToken");
const Subreddit = require("../models/Subreddit");
const Post = require("../models/Post");

router.get("/", verifyToken, (req, res) => {
    res.json("hello you're accessing something denied");
});

// adding a post to subreddit
router.post("/post/:subreddit", verifyToken, async (req, res) => {
    const userToken = req.headers.authtoken;
    const subreddit = req.params.subreddit;
    const title = req.body.title;
    const message = req.body.message;

    const thisSubreddit = await Subreddit.findOne({ name: subreddit });
    if (!thisSubreddit)
        return res.status(404).json({ error: "subreddit not found" });

    // importing the users id
    const { _id } = jwt.decode(userToken);

    // creating a new post
    const newPost = new Post({
        title,
        message,
        subreddit,
        user: _id,
    });
    newPost
        .save()
        .then(res.status(201).json({ message: "post created successfully" }));
});

module.exports = router;
