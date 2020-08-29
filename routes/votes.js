const router = require("express").Router();

const User = require("../models/User");
const Subreddit = require("../models/Subreddit");
const Post = require("../models/Post");
const verifyToken = require("../config/verifyToken");

router.get("/getvotes", verifyToken, async (req, res) => {});

router.put("/add/up", verifyToken, async (req, res) => {});
router.put("/delete/up", verifyToken, async (req, res) => {});
router.put("/add/down", verifyToken, async (req, res) => {});
router.put("/delete/down", verifyToken, async (req, res) => {});

module.exports = router;
