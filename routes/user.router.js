const router = require('express').Router();                                 // TODO відокремлюй бібліотечні імпоти від своїх ентером (додай ентер пісця цього рядка)
const userController = require('../controllers/user.controller');
                                                                            // TODO більше ніж один ентер підряд не став

router.get('/', userController.getUsers);

router.get('/:user_id', userController.getUserById);

router.post('/defalt', userController.createUsers);                         // TODO навіщо дублюєш логіку на два ендпоінти?

router.post('/', userController.createUser);                                // TODO навіщо дублюєш логіку на два ендпоінти?

router.put('/', userController.updateUser);

router.delete('/', userController.deleteUsers);                             // TODO цей роут без потреби, не потрібно видаляти всіх користувачів ))

router.delete('/:user_id', userController.deleteUser);

module.exports = router;




// router.get('/', userController.getUsers);             // TODO групуй роути так спочатку на / потім ентер і далі на /:user_id
// router.post('/', userController.createUser);
//
// router.get('/:user_id', userController.getUserById);
// router.put('/:user_id', userController.updateUser);
// router.delete('/:user_id', userController.deleteUser);
