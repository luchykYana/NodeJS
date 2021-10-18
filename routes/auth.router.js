const router = require('express')
    .Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const {loginUserValidator} = require('../validators/user.validator');

router.post(
    '/login',
    userMiddleware.isUserBodyValid(loginUserValidator, true),
    userMiddleware.checkUserForLoginMiddleware,
    authController.getLogin
);

router.post(
    '/refresh',
    userMiddleware.checkRefreshToken,
    authController.getLogin
);

module.exports = router;
