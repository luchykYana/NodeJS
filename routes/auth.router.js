const router = require('express')
    .Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const {loginUserValidator, emailValidator, passwordValidator} = require('../validators/user.validator');
const {tokenTypes} = require('../configs');

router.post(
    '/login',
    userMiddleware.isUserBodyValid(loginUserValidator, true),
    userMiddleware.checkUserForLoginMiddleware,
    authController.getLogin
);

router.post('/logout',
    userMiddleware.checkToken(tokenTypes.ACCESS),
    authController.getLogout
);

router.post(
    '/refresh',
    userMiddleware.checkToken(tokenTypes.REFRESH),
    authController.getLogin
);

router.post('/password/forgot',
    userMiddleware.isUserBodyValid(emailValidator, true),
    authController.sendMailForgotPassword);

router.put('/password/forgot',
    userMiddleware.isUserBodyValid(passwordValidator, true),
    userMiddleware.checkActionToken,
    authController.setNewPasswordAfterForgot);

module.exports = router;
