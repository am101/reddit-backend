const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Subreddit = require("../models/Subreddit");
const User = require("../models/User");
const verifyToken = require("../config/verifyToken");

// ********************************************************************************************************************************* //
// get all subreddit
router.get("/", verifyToken, async (req, res) => {
    const subreddits = await Subreddit.find({});
    res.status(200).json(subreddits);
});

// ********************************************************************************************************************************* //
// find specific subreddit
router.get("/:name", verifyToken, async (req, res) => {
    const name = req.params.name;

    const subreddits = await Subreddit.find({
        name,
    });
    if (!subreddits)
        return res.status(404).json({
            error: "no such subreddit found",
        });
    res.status(200).json(subreddits);
});

// ********************************************************************************************************************************* //
// delete specific subreddit
router.delete("/:name", verifyToken, async (req, res) => {
    const name = req.params.name;
    const userToken = req.headers.authtoken;

    // importing the users id
    const { _id } = jwt.decode(userToken);

    // check if the subreddit already exists
    const subreddits = await Subreddit.findOne({
        name,
    });
    if (!subreddits)
        return res.status(404).json({
            error: "no such subreddit found",
        });

    const isUserMod = await subreddits.moderators.map((mods) => {
        if (mods.modId == _id) {
            return true;
        } else {
            return false;
        }
    });
    if (isUserMod)
        return res.status(403).json({
            error: "you don't have the access to delete the subreddit",
        });

    // deleting the subreddit
    Subreddit.deleteOne({
        _id: subreddits._id,
    }).then(
        res.status(200).json({
            message: "subreddit deleted successfully",
        })
    );
    // deleting all the posts in the subreddit is still pending
});

// ********************************************************************************************************************************* //
// adding moderators
// router.put('/mods/:name', verifyToken, async (req, res) => {
// 	const username = req.body.username;
// 	const name = req.params.name;
// 	const userToken = req.headers.authtoken;

// 	// importing the users id
// 	const { _id } = jwt.decode(userToken);

// 	// check if the subreddit already exists
// 	const subreddits = await Subreddit.findOne({ name });
// 	if (!subreddits) return res.status(404).json({ error: 'no such subreddit found' });

// 	const isUserMod = await subreddits.moderators.map((mods) => {
// 		if (mods.modId == _id) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	});
// 	if (isUserMod)
// 		return res.status(403).json({ error: "you don't have the access to add moderators to this subreddit" });

// 	const newUser = User.findOne({ username });
// 	if (!newUser) return res.status(404).json({ error: 'no such user found' });

// 	Subreddit.update(
// 		{ _id: subreddits._id },
// 		{ $push: { moderators: { $each: [ { modName: (await newUser).username, modId: (await newUser)._id } ] } } }
// 	).then(res.status(201).json({ message: 'user added successfully' }));
// });

// ******************************************************************************************************************************** //
//create a subreddit
router.post("/create/:subreddit", verifyToken, async (req, res) => {
    const name = req.params.subreddit;
    const userToken = req.headers.authtoken;

    // check if the subreddit already exists
    const subredditExists = await Subreddit.findOne({
        name,
    });
    if (subredditExists)
        return res.status(400).json({
            error: "subreddit already exists",
        });

    // importing the users id
    const { _id } = jwt.decode(userToken);
    const user = await User.findById(_id);

    // if alls good create one subreddit with mods
    const newSubreddit = new Subreddit({
        name: name,
        moderators: [
            {
                modName: user.username,
                modId: user._id,
            },
        ],
    });
    newSubreddit.save().then(
        res.status(201).json({
            message: "subreddit successfully created",
        })
    );
});

module.exports = router;
