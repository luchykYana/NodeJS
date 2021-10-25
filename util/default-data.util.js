const {userRoles} = require('../configs');
const {User} = require('../dataBase');

module.exports = async () => {
    const user = await User.findOne({role: userRoles.ADMIN});

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Alyona',
            email: 'alona.admin@site.com',
            password: 'Hello_Wordly1!',
            role: userRoles.ADMIN
        });
    }
};
