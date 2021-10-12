module.exports = {
    userNormalisator: (userToNormalize) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        userToNormalize = userToNormalize.toObject();

        fieldsToRemove.forEach((field) => delete userToNormalize[field]);

        return userToNormalize;
    }
};
