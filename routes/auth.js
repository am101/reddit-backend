const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { validateRegister, validateLogin } = require('../config/authorization');
const { cryptPassword, comparePassword } = require('../config/bcrypt');
const { userCheck } = require('../config/userCheck');

router.get('/', (req, res) => {
	res.send('the router is working');
});
router.post('/register', async (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	//validating input data
	const { error } = validateRegister(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	//validating if user exists or username is not unique
	const errormessage = await userCheck(User, username, email);
	if (errormessage) return res.status(400).json({ error: errormessage });

	// hashing users password
	const hashedPassword = await cryptPassword(password);

	// saving new user
	const newUser = new User({
		username,
		email,
		password: hashedPassword
	});
	newUser.save().then(res.status(201).json({ message: 'user successfully registered' }));
});
router.post('/login', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	// validating user credentials
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	// checking username is valid
	const user = await User.findOne({ username });
	if (!user) return res.status(400).json({ error: 'Username or password incorrect' });

	// checking if password is valid
	const checkPassword = await comparePassword(password, user.password);
	if (!checkPassword) return res.status(400).json({ error: 'Username or password incorrect' });

	// signing a JWT to the user
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
	res.status(200).json({ authtoken: token, message: 'successfully logged in' });
	res.header(token);
});

module.exports = router;
