const router = require('express').Router();
const userCtrl = require('../controller/user');
const auth = require('../middleware/auth');

router.get('/user/:username', auth, userCtrl.getUser);

module.exports = router;
