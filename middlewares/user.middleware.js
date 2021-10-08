const User = require('../dataBase/User');

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

            const userByPassword = await User.findOne({email, password});

            if (!userByPassword) {
                throw new Error('Email or password not exists');
            }

            req.user = userByPassword;

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

            req.user = user;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
