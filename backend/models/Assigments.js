const mongoose = require('mongoose');
const {Schema} = mongoose;

const assig = new Schema({
    createdBy : {type:mongoose.Schema.Types.ObjectId, ref:'Teacher', required:true},
    createdAt: {type:Date, default:Date.now},
    dueBy: {type:Date},
    max: {type:Number, min:0, max:10},
    description: {type:String}
    
})

const Assigment = mongoose.model('Assigments', assig);

module.exports = Assigment;