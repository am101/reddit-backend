const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_URI;
const app = express();

app.use(express.json());

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

//importing all middleware Routes
const authRoutes = require("./routes/auth");
const subRoutes = require("./routes/subreddit");
const postRoutes = require("./routes/post");

app.get("/", async (req, res) => {
    res.json("pass!");
});
//implementing all middleware routes
app.use("/api/user", authRoutes);
app.use("/r/api/v1", subRoutes);
app.use("/r/api/v1", postRoutes);

module.exports = app;
