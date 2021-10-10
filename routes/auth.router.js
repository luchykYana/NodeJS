const router = require('express')
    .Router();

const loginController = require('../controllers/auth.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post(
    '/login',
    userMiddleware.isUserBodyValid,
    userMiddleware.checkUserForLoginMiddleware,
    loginController.getLogin
);

module.exports = router;
