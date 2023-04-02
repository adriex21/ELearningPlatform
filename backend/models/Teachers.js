const mongoose = require('mongoose');
const {Schema} = mongoose;

const teacher = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    password: {type:String},
    email: {type:String},
    coursesManaged : [{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}],
})

const Teacher = mongoose.model('Teacher', student);

module.exports = Teacher;