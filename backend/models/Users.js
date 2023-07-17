const mongoose = require('mongoose');
const {Schema} = mongoose;
const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const user = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    password: {type:String},
    email: {type:String},
    role: {type:String, required:true, enum: ['Student', 'Teacher']},
    testScores:  [{course: {type: mongoose.Schema.Types.ObjectId, ref:"Courses"}, test: {type: mongoose.Schema.Types.ObjectId, ref:"Submission"}, score: {type: Number}}],
    coursesManaged : [{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}],
})

user.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      //before save we hash the password we are going to store
      const hashedPassword = await bcrypt.hash(user.password, 8);
      //and then encrypt it using AES and a secret key stored in the environment variables
      user.password = CryptoJS.AES.encrypt(hashedPassword, process.env.AES_ENCRYPTION_SECRET)
    }
    next();
});

const User = mongoose.model('Users', user);

module.exports = User;