const mongoose = require('mongoose');
const {Schema} = mongoose;

const user = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    password: {type:String},
    email: {type:String},
    role: {type:String, required:true, enum: ['Student', 'Teacher']},
    enrolledCourses : [{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}],
    performanceData: {grades: [{course: {type: mongoose.Schema.Types.ObjectId, ref:"Courses"},grade: {type: Number,required: true}}]},
    testScores: [{course: {type: mongoose.Schema.Types.ObjectId, ref:"Courses"},test: {type: String},score: {type: Number}}],
    coursesManaged : [{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}],
    
})

const User = mongoose.model('Users', user);

module.exports = User;