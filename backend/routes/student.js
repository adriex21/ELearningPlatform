const express = require("express");
const router = express();
const student= require('../controllers/student');
const auth = require('../middlewares/auth');


router.post("/submit/:id", auth(), student.submit);



module.exports = router;