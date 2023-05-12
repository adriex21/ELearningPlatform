const express = require('express');
const validate= require('../middlewares/validate');
const {userValidation} = require('../validation');
const user = require('../controllers/user');
const router = express.Router();

router.post('/signup', validate(userValidation.userSignUp),user.register);
router.post('/login', validate(userValidation.userLogin), user.login);

module.exports = router;