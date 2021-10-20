const userUtil = require('../util/user.util');
const {jwtService, emailService} = require('../service');
const {O_Auth} = require('../dataBase');
const {constants, tokenTypes} = require('../configs');

module.exports = {
    getLogin: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtService.generateTokenPair();

            await emailService.sendMail(user.email, 'hello', {userName: user.name});

            const normalizedUser = userUtil.userNormalisator(user);

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
};
