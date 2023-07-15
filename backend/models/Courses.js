const mongoose = require('mongoose');
const {Schema} = mongoose;

const course = new Schema({
    name: {type:String, required:true},
    description: {type:String},
    instructor: {type:mongoose.Schema.Types.ObjectId, ref:'Users', required:true},
    year:{type:Number, required:true, default:()=>new Date().getFullYear()},
    modules : [{title:{type:String, required : true}, content: {type:String, required:true}}]
}) 

const Course = mongoose.model('Courses', course);
module.exports = Course;


