const userUtil = require('../util/user.util');

module.exports = {
    getLogin: (req, res, next) => {
        try {
            const normalizedUser = userUtil.userNormalisator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }
};
