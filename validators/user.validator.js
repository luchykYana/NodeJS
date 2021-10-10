const Joi = require('joi');

const {EMAIL_REGEXP, PASSWORD_REGEXP} = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .trim()
        .required()
        .regex(EMAIL_REGEXP),
    role: Joi
        .string()
        .allow(...Object.values(userRoles)),
    password: Joi
        .string()
        .required()
        .regex(PASSWORD_REGEXP),
});

module.exports = {
    createUserValidator
};
