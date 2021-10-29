const {User, O_Auth} = require('../dataBase');
const {emailService, userService, s3Service} = require('../service');
const {emailActions} = require('../configs');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers(req.query);

            const normalizedUsers = [];

            users.forEach((user, index) => {
                normalizedUsers[index] = user.normaliseUser();
            });

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const normalizedUser = req.user.normaliseUser();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            let newUser = await User.createUserWithHashPassword(user);

            if (req.files && req.files.avatar) {
                const uploadInfo = await s3Service.uploadImage(req.files.avatar, 'users', newUser._id.toString());

                newUser = await User.findByIdAndUpdate(newUser._id, {avatar: uploadInfo.Location}, {new: true});
            }

            await emailService.sendMail(user.email, emailActions.WELCOME, {userName: user.name});

            const normalizedUser = newUser.normaliseUser();

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

            const normalizedUser = user.normaliseUser();

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const user = await User.findById(user_id);

            await emailService.sendMail(user.email, emailActions.GOODBYE, {userName: user.name});

            await User.deleteOne(user);

            await O_Auth.deleteMany({user_id});

            res.json('User is deleted!');
        } catch (e) {
            next(e);
        }
    }
};
