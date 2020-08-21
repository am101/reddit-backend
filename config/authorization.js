const Joi = require('@hapi/joi');

function validateRegister(data) {
	const schema = Joi.object({
		username: Joi.string().required().min(4).max(20),
		email: Joi.string().required().email(),
		password: Joi.string().required().min(6).max(1024)
	});

	const validation = schema.validate(data);

	return validation;
}

function validateLogin(data) {
	const schema = Joi.object({
		username: Joi.string().min(4).max(20),
		email: Joi.string().email(),
		password: Joi.string().required().min(6).max(1024)
	});

	const validation = schema.validate(data);

	return validation;
}

module.exports = { validateRegister, validateLogin };
