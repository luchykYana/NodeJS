const {jwtService, emailService, passwordService} = require('../service');
const {O_Auth, User, ActionToken} = require('../dataBase');
const {constants, tokenTypes, emailActions, actionTokenTypes, config} = require('../configs');
const {ErrorHandler, errors} = require('../errors');

const {FRONT_END_URL} = config;
const {NOT_FOUND_BY_EMAIL} = errors;

module.exports = {
    getLogin: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            await emailService.sendMail(user.email, emailActions.HELLO, {userName: user.name});

            const normalizedUser = user.normaliseUser();

            await O_Auth.create({
                ...tokenPair,
                user_id: normalizedUser._id
            });

            res.json({
                normalizedUser,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    getLogout: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            await O_Auth.deleteOne({[tokenTypes.ACCESS]: token});

            res.json('Goodbye!');
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler(NOT_FOUND_BY_EMAIL.message, NOT_FOUND_BY_EMAIL.code);
            }

            const actionToken = jwtService.generateActionToken(actionTokenTypes.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: actionTokenTypes.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(
                email,
                emailActions.FORGOT_PASSWORD,
                {forgotPasswordUrl: `${FRONT_END_URL}/passwordForgot?token=${actionToken}`});

            res.json('Ok');
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const {newPassword} = req.body;
            const userObject = req.user;

            const hashedPassword = await passwordService.hash(newPassword);

            await User.findByIdAndUpdate(userObject.id, {password: hashedPassword}, {new: true});

            res.json('Password is changed');
        } catch (e) {
            next(e);
        }
    },
};
