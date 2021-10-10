const userUtil = require('../util/user.util');

module.exports = {
    getLogin: (req, res) => {
        try {
            const normalizedUser = userUtil.userNormalisator(req.user);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    }
};
