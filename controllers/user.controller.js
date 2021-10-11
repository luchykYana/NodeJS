const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            const normalizedUsers = [];

            users.forEach((user, index) => {
                normalizedUsers[index] = userUtil.userNormalisator(user);
            });

            res.json(normalizedUsers);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            const normalizedUser = userUtil.userNormalisator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {password} = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizedUser = userUtil.userNormalisator(newUser);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const {name} = req.body;

            const user = await User.findByIdAndUpdate(user_id, {name}, {new: true});

            const normalizedUser = userUtil.userNormalisator(user);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;

            await User.deleteOne({_id: user_id});

            res.json('User is deleted!');
        } catch (e) {
            res.json(e.message);
        }
    }
};
