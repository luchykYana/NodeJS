const router = require('express')
    .Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const {userRoles} = require("../configs");

router.post(
    '/login',
    userMiddleware.isUserBodyValidForLogin,
    userMiddleware.checkUserForLoginMiddleware,
    userMiddleware.checkUserRole([
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
    authController.getLogin
);

module.exports = router;
