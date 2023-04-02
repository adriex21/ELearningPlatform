const mongoose = require('mongoose');
const {Schema} = mongoose;

const student = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    password: {type:String},
    email: {type:String},
    enrolledCourses : [{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}],
    performanceData: {grades: [{course: {type: mongoose.Schema.Types.ObjectId, ref:"Courses"},grade: {type: Number,required: true}}]},
    testScores: [{course: {type: mongoose.Schema.Types.ObjectId, ref:"Courses"},test: {type: String},score: {type: Number}}],
})

const Student = mongoose.model('Students', student);

module.exports = Student;