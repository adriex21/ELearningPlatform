const mongoose = require('mongoose');
const {Schema} = mongoose;

const submission = new Schema({

   submittedBy: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
   submittedFor: {type:mongoose.Schema.Types.ObjectId, ref:'Assignments'},
   submittedAt: {type:Date, default:Date.now},
   answer:{type:String},
   grade: {type:Number, min:0, max:100},
   feedback : {type:String},
   timer: {type:Number}
})

const Submission = mongoose.model('Submission', submission);

module.exports = Submission;