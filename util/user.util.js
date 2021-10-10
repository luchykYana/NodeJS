module.exports = {
    userNormalisator: (userToNormalize = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {userToNormalize[field] = '********';});
        // fieldsToRemove.forEach((field) => delete userToNormalize[field]);

        return userToNormalize;
    }
};
