const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const {errors, ErrorHandler} = require('../errors');

const {BAD_REQUEST_USER_REGISTERED, NOT_VALID_BODY, NOT_FOUND, NOT_FOUND_BY_ID, FORBIDDEN} = errors;

module.exports = {
    checkUserByEmailMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(BAD_REQUEST_USER_REGISTERED.message, BAD_REQUEST_USER_REGISTERED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserForLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(NOT_FOUND.message, NOT_FOUND.code);
            }

            await passwordService.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (validator, isLogin) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                let message;

                if (isLogin) {
                    message = NOT_VALID_BODY.message;
                } else {
                    message = error.details[0].message;
                }

                throw new ErrorHandler(message, NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(FORBIDDEN.message, FORBIDDEN.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
