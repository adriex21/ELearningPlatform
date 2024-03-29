const mongoose = require('mongoose');
const {Schema} = mongoose;

const course = new Schema({
    name: {type:String, required:true},
    description: {type:String},
    instructor: {type:mongoose.Schema.Types.ObjectId, ref:'Users', required:true},
    year:{type:Number, required:true, default:()=>new Date().getFullYear()},
    modules : [{title:{type:String, required : true}, description:{type:String}, content: {type:String, required:true}}],
    assignments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Assignments'}],
}) 

const Course = mongoose.model('Courses', course);
module.exports = Course;


