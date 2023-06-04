const express = require('express');
const validate= require('../middlewares/validate');
const {userValidation} = require('../validation');
const user = require('../controllers/user');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/signup', validate(userValidation.userSignUp),user.register);
router.post('/login', validate(userValidation.userLogin), user.login);
router.get('/getUser', auth(), user.getUser);

module.exports = router;