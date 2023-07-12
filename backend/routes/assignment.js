const express = require("express");
const router = express();
const assignment= require('../controllers/assignment');
const auth = require('../middlewares/auth');

router.put("/timer/:id", assignment.setTimer);



module.exports = router;