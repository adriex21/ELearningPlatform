const express = require('express');
const teacher = require('../controllers/teacher');
const router = express.Router();
const auth = require('../middlewares/auth');
const validate= require('../middlewares/validate');
const {assignmentValidation} = require('../validation');

router.post('/createAssignment', validate(assignmentValidation.createAssignment),auth(), teacher.createAssignment);
router.put('/editAssignment/:id', validate(assignmentValidation.editAssignment), auth(), teacher.editAssignment );
router.get('/getSubmissions/:id', auth(), teacher.getSubmissions);
router.get('/getSubmission/:id', auth(), teacher.getSubmission);
router.put('/gradeSubmission/:id', auth(), teacher.gradeSubmission);

module.exports = router;