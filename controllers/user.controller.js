const {User} = require('../dataBase');
const {passwordService, emailService} = require('../service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            const normalizedUsers = [];

            users.forEach((user, index) => {
                normalizedUsers[index] = userUtil.userNormalisator(user);
            });

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalisator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {password, name} = req.body;

            const hashedPassword = await passwordService.hash(password);

            await emailService.sendMail(req.body.email, 'welcome', {userName: name});

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizedUser = userUtil.userNormalisator(newUser);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            const user = await User.findByIdAndUpdate(user_id, {name}, {new: true});

            const normalizedUser = userUtil.userNormalisator(user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            await emailService.sendMail(user.email, 'goodbye', {userName: user.name});

            await User.deleteOne(user);

            res.json('User is deleted!');
        } catch (e) {
            next(e);
        }
    }
};
