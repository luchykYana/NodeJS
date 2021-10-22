const jwt = require('jsonwebtoken');

const {config, tokenTypes, actionTokenTypes} = require('../configs');
const {errors, ErrorHandler} = require('../errors');

const {FORGOT_PASSWORD} = actionTokenTypes;
const {NOT_VALID_TOKEN, WRONG_TOKEN_TYPE} = errors;

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
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = config.JWT_ACTION_SECRET;
                break;
            default:
                throw new ErrorHandler(WRONG_TOKEN_TYPE.message, WRONG_TOKEN_TYPE.code);
        }

        return jwt.sign({}, secretWord, {expiresIn: '24h'});
    },

    verifyActionToken: (token, tokenType = tokenTypes.ACTION) => {
        try {
            const secret = tokenType === tokenTypes.ACTION ? config.JWT_ACTION_SECRET : null;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
        }
    },
};
