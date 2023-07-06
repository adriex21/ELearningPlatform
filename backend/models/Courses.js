const mongoose = require('mongoose');
const {Schema} = mongoose;

const course = new Schema({
    name: {type:String},
    description: {type:String},
    instructor: {type:mongoose.Schema.Types.ObjectId, ref:'Teacher', required:true},
    students : {type:mongoose.Schema.Types.ObjectId, ref: 'Students'},
    modules : [{title:{type:String, required : True}, content: {type:String, required:true}}]
}) 

const Course = mongoose.model('Courses', course);
module.exports = Course;


