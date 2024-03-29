const express = require('express');
const validate= require('../middlewares/validate');
const {userValidation} = require('../validation');
const user = require('../controllers/user');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/signup', validate(userValidation.userSignUp),user.register);
router.post('/login', validate(userValidation.userLogin), user.login);
router.get('/getUser', auth(), user.getUser);
router.get('/getAssignments', auth(), user.getAssignments);
router.get('/getAssignment/:id', auth(), user.getAssignment);
router.get('/getSubmission/:id', auth(), user.getSubmission);
router.get('/getCourses', auth(), user.getCourses);
router.get('/getCourse/:id', auth(), user.getCourse);



module.exports = router;