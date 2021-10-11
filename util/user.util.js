module.exports = {
    userNormalisator: (userToNormalize = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {userToNormalize[field] = undefined;});

        const userNorm = JSON.parse(JSON.stringify(userToNormalize));

        return userNorm;
    }
};
