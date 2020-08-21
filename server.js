const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const URI = process.env.DB_URI;
const app = express();

app.use(express.json());

mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    console.log("connected to db successfully")
);

//importing all middleware Routes
const authRoutes = require("./routes/auth");
const subRoutes = require("./routes/subreddit");
const postRoutes = require("./routes/post");

//implementing all middleware routes
app.use("/api/user", authRoutes);
app.use("/r/api/v1", subRoutes);
app.use("/r/api/v1", postRoutes);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
