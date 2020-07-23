import { celebrate, Joi, Segments } from 'celebrate';

const UserValidator = {
	register: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().email().required(),
			user: Joi.number().required(),
			name: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	auth: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().required(),
			password: Joi.string().required()
		})
	}),
	getNewPassword: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().required(),
		})
	}),
	setNewPassword: celebrate({
		[Segments.BODY]: Joi.object().keys({
			token: Joi.string().required(),
			code: Joi.number().required(),
			password: Joi.string().required()
		})
	}),
};

export default UserValidator;