const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');
const passwordService = require('../service/password.service');

module.exports = {
    checkUserByEmailMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new Error('Email already exists');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserForLoginMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                throw new Error('Wrong email or password');
            }

            await passwordService.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new Error('User with this id does not exist');
            }

            req.id = user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
