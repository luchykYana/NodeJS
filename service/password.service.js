const bcrypt = require('bcrypt');
const ErrorHandler = require("../errors/ErrorHandler");
const {NOT_FOUND} = require("../errors/custom-errors");

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(NOT_FOUND.message, NOT_FOUND.code);
        }
    }
};
