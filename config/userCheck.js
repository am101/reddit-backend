async function userCheck(user, username, email) {
	// checking if user exists
	const isUser = await user.findOne({ username, email });
	if (isUser) return 'account already exists you should try loggin in';

	// checking for unique username
	const userNameNotUnique = await user.findOne({ username });
	if (userNameNotUnique) return 'username already exists';

	// checking if email already exists
	const emailExists = await user.findOne({ email });
	if (emailExists) return 'email already exists';
}

module.exports = { userCheck };
