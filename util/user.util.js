module.exports = {
    userNormalisator: (userToNormalize = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        const userNorm = JSON.parse(JSON.stringify(userToNormalize));

        fieldsToRemove.forEach((field) => delete userNorm[field]);

        return userNorm;
    }
};
