const express = require('express');
const router = express.Router();
const userRouter = require('./user')

router.use('/user', userRouter);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
});


module.exports = router;

