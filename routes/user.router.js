const router = require('express').Router();
const userController = require('../controllers/user.controller');


router.get('/', userController.getUsers);

router.get('/:user_id', userController.getUserById);

router.post('/defalt', userController.createUsers);

router.post('/', userController.createUser);

router.put('/', userController.updateUser);

router.delete('/', userController.deleteUsers);

router.delete('/:user_id', userController.deleteUser);

module.exports = router;