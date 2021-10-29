const router = require('express')
    .Router();

const {userRoles, tokenTypes} = require('../configs');
const {userController} = require('../controllers');
const {userMiddleware, fileMiddleware} = require('../middlewares');
const {updateUserValidator, createUserValidator} = require('../validators/user.validator');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.checkUserByEmailMiddleware,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.checkUserById,
    userController.getUserById
);
router.put(
    '/:user_id',
    userMiddleware.checkToken(tokenTypes.ACCESS),
    userMiddleware.isUserBodyValid(updateUserValidator),
    userMiddleware.checkUserById,
    userController.updateUser
);
router.delete(
    '/:user_id',
    userMiddleware.checkToken(tokenTypes.ACCESS),
    userMiddleware.checkUserById,
    userMiddleware.checkUserRole([
        userRoles.USER,
        userRoles.ADMIN
    ]),
    userController.deleteUser
);

module.exports = router;
