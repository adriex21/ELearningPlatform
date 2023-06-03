const mongoose = require('mongoose');
const {Schema} = mongoose;

const submission = new Schema({
   submittedBy: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
   
    
})

const Submission = mongoose.model('Submission', submission);

module.exports = Submission;