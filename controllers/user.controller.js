const path = require('path');

const {read, write} = require('../helper/users.helper');

const usersPath = path.join('dataBase','users.json');

module.exports = {
    getUsers: async (req, res) => {
        const users = await read(usersPath);

        res.json(users);
    },

    getUserById: async (req, res) => {
        const { user_id } = req.params;

        const users = await read(usersPath);

        if(users.length < user_id){
            res.json('User with such id doesn`t exist');
        } else {
            res.json(users[user_id - 1]);
        }
    },

    createUser: async (req, res) => {
        const users = await read(usersPath);
        users.push({...req.body, id: users.length + 1});

        await write(usersPath, JSON.stringify(users));

        res.json(`User with id ${users.length} was added`);
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

        const foundUsers = users.filter(user => user.id !== +user_id);

        await write(usersPath, JSON.stringify(foundUsers));

        res.json(`User with id ${user_id} is deleted`);
    }
}