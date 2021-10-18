const jwt = require('jsonwebtoken');

const {config, tokenTypes} = require('../configs');
const {errors, ErrorHandler} = require('../errors');

const {NOT_VALID_TOKEN} = errors;

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = tokenTypes.ACCESS) => {
        try {
            const secret = tokenType === tokenTypes.ACCESS ? config.JWT_ACCESS_SECRET : config.JWT_REFRESH_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
        }
    }
};
