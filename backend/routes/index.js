const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const teacherRouter=  require('./teacher');

router.use('/user', userRouter);
router.use('/teacher', teacherRouter);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
});


module.exports = router;

