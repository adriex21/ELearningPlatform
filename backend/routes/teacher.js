const express = require('express');
const teacher = require('../controllers/teacher');
const router = express.Router();
const auth = require('../middlewares/auth');
const validate= require('../middlewares/validate');
const {assignmentValidation, courseValidation} = require('../validation');

router.post('/createAssignment/:id', validate(assignmentValidation.createAssignment),auth(), teacher.createAssignment);
router.put('/editAssignment/:id', validate(assignmentValidation.editAssignment), auth(), teacher.editAssignment );
router.get('/getSubmissions/:id', auth(), teacher.getSubmissions);
router.put('/gradeSubmission/:id', auth(), teacher.gradeSubmission);
router.post('/createCourse', validate(courseValidation.createCourse), auth(), teacher.createCourse);
router.put('/createModule/:id',validate(courseValidation.createModule) ,auth(), teacher.createModule);

module.exports = router;