const mongoose = require('mongoose');
const {Schema} = mongoose;

const admin = new Schema({
    firstName: {type:String},
    lastName: {type:String},
    password: {type:String},
    email: {type:String},
    coursesCreated: [{type:mongoose.Schema.Types.ObjectId, ref:"Courses"}],

})

const Admin = mongoose.model('Admins', admin);

module.exports = Admin;