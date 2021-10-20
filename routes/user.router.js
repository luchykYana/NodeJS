const router = require('express')
    .Router();

const {userController} = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');
const {updateUserValidator, createUserValidator} = require('../validators/user.validator');
const {userRoles, tokenTypes} = require('../configs');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserBodyValid(createUserValidator),
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
