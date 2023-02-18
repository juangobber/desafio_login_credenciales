const {Router} = require('express')
const { loginController, registerController, logoutController } = require('../controllers/session.controllers');

const router = Router()

//Session routes

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/logout', logoutController)

module.exports = router