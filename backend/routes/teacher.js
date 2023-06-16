const express = require('express');
const teacher = require('../controllers/teacher');
const router = express.Router();
const auth = require('../middlewares/auth');
const validate= require('../middlewares/validate');
const {assignmentValidation} = require('../validation');

router.post('/createAssignment', validate(assignmentValidation.createAssignment),auth(), teacher.createAssignment);


module.exports = router;