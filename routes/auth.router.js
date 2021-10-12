const router = require('express')
    .Router();

const {authController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

router.post(
    '/login',
    userMiddleware.isUserBodyValidForLogin,
    userMiddleware.checkUserForLoginMiddleware,
    authController.getLogin
);

module.exports = router;
