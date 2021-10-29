module.exports = {
    BAD_REQUEST_USER_REGISTERED: {
        message: 'Email already exists',
        code: 400
    },

    NOT_VALID_BODY: {
        message: 'Wrong email or password',
        code: 400
    },

    TOO_BIG_FILE: (name) => ({
        message: `File ${name} is too big`,
        code: 400
    }),

    NOT_VALID_TOKEN: {
        message: 'Invalid token',
        code: 401
    },

    FORBIDDEN: {
        message: 'Access denied',
        code: 403
    },

    CORS_IS_FORBIDDEN: {
        message: 'CORS is not allowed',
        code: 403
    },

    NOT_FOUND_BY_ID: {
        message: 'User with this id does not exist',
        code: 404
    },

    NOT_FOUND_BY_EMAIL: {
        message: 'User with this email does not exist',
        code: 404
    },

    NOT_FOUND_EMAIL_TEMPLATE: {
        message: 'Email template does not exist',
        code: 404
    },

    NOT_SUPPORTED_FORMAT: {
        message: 'Not supported format',
        code: 415
    },

    WRONG_TOKEN_TYPE: {
        message: 'Wrong token type',
        code: 500
    }
};
