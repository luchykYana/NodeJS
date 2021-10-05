const path = require('path');

const {read, write} = require('../helper/users.helper');

const usersPath = path.join('dataBase','users.json');

module.exports = {
    getUsers: (req, res) => {
        read(usersPath).then(users => {
            res.json(users);
        });
    },

    getUserById: (req, res) => {
        const { user_id } = req.params;

        read(usersPath).then(users => {
            if(users.length < user_id){
                res.json('User with such id doesn`t exist');
            } else {
                res.json(users[user_id - 1]);
            }
        });
    },

    createUser: (req, res) => {
        read(usersPath).then(users => {
            users.push({...req.body, id: users.length + 1});
            res.json(`User with id ${users.length + 1} was added`);
            write(usersPath, JSON.stringify(users));
        });
    },

    updateUser: (req, res) => {
        res.json('UPDATE!');
    },

    deleteUser: async (req, res) => {
        const { user_id } = req.params;

        const users = await read(usersPath);

        if (users.length < user_id) {
            res.json('User with such id doesn`t exist');
            return;
        }

        users.splice(user_id - 1, 1);

        await write(usersPath, JSON.stringify(users));

        res.json(`User with id ${user_id} is deleted`);
    }
}