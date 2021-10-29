const {constants} = require('../configs');
const {ErrorHandler, errors} = require('../errors');

const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = constants;
const {NOT_SUPPORTED_FORMAT, TOO_BIG_FILE} = errors;

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const {avatar} = req.files;

            if (!avatar) {
                next();
                return;
            }

            const {name, size, minetype} = avatar;

            if (!PHOTOS_MIMETYPES.includes(minetype)) {
                throw new ErrorHandler(NOT_SUPPORTED_FORMAT.message, NOT_SUPPORTED_FORMAT.code);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(TOO_BIG_FILE(name).message, TOO_BIG_FILE(name).code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
