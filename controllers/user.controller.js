const path = require('path');                                                          // TODO додай ентер пісця цього рядка
const {read, write} = require('../helper/users.helper');

const usersPath = path.join('dataBase','users.json');                                  // TODO додай ентер пісця цього рядка
module.exports = {
    getUsers: (req,res) => {
        read(usersPath).then(users => {
            res.json(users)                                                            // TODO додай ";"
        });
    },

    getUserById: (req,res) => {
        const { user_id } = req.params;

        read(usersPath).then(users => {
            if(users.length < user_id){
                res.json('User with such id doesn`t exist');
            } else {
                res.json(users[user_id - 1]);
            }
        });
    },

    createUsers: (req,res) => {
        read(usersPath).then(users => {
            users = req.body;
            res.json(`User with id ${users.length + 1} was added`);
            write(usersPath, JSON.stringify(users));
        });
    },

    createUser: (req,res) => {
        read(usersPath).then(users => {
            users.push({...req.body, id: users.length + 1});
            res.json(`User with id ${users.length + 1} was added`);
            write(usersPath, JSON.stringify(users));
        });
    },

    updateUser: (req,res) => {
        res.json('UPDATE!');
    },

    deleteUsers: (req,res) => {
        read(usersPath).then(users => {
            users = [];
            res.json(`All users are deleted`);
            write(usersPath, JSON.stringify(users));
        });
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
