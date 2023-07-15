const express = require("express");
const router = express();
const submission= require('../controllers/submission');
const auth = require('../middlewares/auth');

router.put("/timer/:id", submission.setTimer);

module.exports = router;