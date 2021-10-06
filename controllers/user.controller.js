const path = require('path');

const {read, write} = require('../helper/users.helper');

const usersPath = path.join('dataBase', 'users.json');

module.exports = {
    getUsers: async (req, res) => {
        const users = await read(usersPath);

        res.json(users);
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;

        const users = await read(usersPath);

        const user = users.find(u => u.id === +user_id);

        if (!user) {
            res.json('User with such id doesn`t exist');
            return;
        }

        res.json(user);
    },

    createUser: async (req, res) => {
        const users = await read(usersPath);

        const userId = users[users.length-1].id + 1;

        users.push({...req.body, id: userId});

        await write(usersPath, users);

        res.json(`User with id ${userId} was added`);
    },

    updateUser: async (req, res) => {
        const {user_id} = req.params;
        const user_fields = req.body;

        const users = await read(usersPath);

        const user = users.find(u => u.id === +user_id);

        for (const userKey in user) {
            for (const userFieldsKey in user_fields) {
                if (userKey === userFieldsKey &&
                        typeof user[userKey] === typeof user_fields[userFieldsKey] &&
                        userFieldsKey !== 'id') {
                    user[userKey] = user_fields[userFieldsKey];
                }
            }
        }

        await write(usersPath, users);

        res.json('UPDATE!');
    },

    deleteUser: async (req, res) => {
        const {user_id} = req.params;

        const users = await read(usersPath);

        const user = users.find(u => u.id === +user_id);

        if (!user) {
            res.json('User with such id doesn`t exist');
            return;
        }

        const foundUsers = users.filter(user => user.id !== +user_id);

        await write(usersPath, foundUsers);

        res.json(`User with id ${user_id} is deleted`);
    }
}