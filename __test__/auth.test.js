const app = require("../server");
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require('../models/User');

const request = supertest(app);

beforeAll(async () => {
    const URI = process.env.DB_URI;
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

it("Gets the testing end point", async (done) => {
    const res = await request.get("/");

    expect(res.status).toBe(200);

    done();
});

userObject = {
    username: "ljbewhbf83y4892374",
    email: "basud@mail.com",
    password: "pppasjdubhcae7y8hewf3278ebfwiw82w"
}

it("Should save user to database", async (done) => {
    const res = await request.post("/api/user/register").send({
        username: userObject.username,
        password: userObject.password,
        email: userObject.email
    });
    expect(res.status).toBe(201);
    done();
});

it("Should check user on database", async (done) => {
    const res = await request.post("/api/user/register").send({
        username: "testuser",
        password: "testpassword",
    });
    expect(res.status).toBe(200);
    done();
});

afterEach(async () => {
    await User.deleteOne({ username: userObject.username });
});