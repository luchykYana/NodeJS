const {User, O_Auth} = require('../dataBase');
const {passwordService, jwtService} = require('../service');
const {errors, ErrorHandler} = require('../errors');
const {constants, tokenTypes} = require('../configs');

const {BAD_REQUEST_USER_REGISTERED, NOT_VALID_BODY, NOT_FOUND_BY_ID, FORBIDDEN, NOT_VALID_TOKEN} = errors;

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
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
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
    },

    checkToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            await jwtService.verifyToken(token, tokenType);

            let tokenResponse;

            if (tokenType === tokenTypes.ACCESS) {
                tokenResponse = await O_Auth
                    .findOne({access_token: token})
                    .populate('user_id');

            } else {
                tokenResponse = await O_Auth
                    .findOne({refresh_token: token})
                    .populate('user_id');
            }

            if (!tokenResponse) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }

            if (tokenType === tokenTypes.REFRESH) {
                await O_Auth.deleteOne({refresh_token: token});
            }

            req.user = tokenResponse.user_id;

            next();
        } catch (e) {
            next(e);
        }
    }
};
