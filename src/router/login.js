const router = require('express').Router();
const loginCtrl = require('../controller/login');
const loginValidator = require('../validator/login');

router.post('/register', loginValidator.register, loginCtrl.handleRegister);

router.post('/login', loginValidator.login, loginCtrl.handleLogin);

module.exports = router;
