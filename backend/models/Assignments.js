const mongoose = require('mongoose');
const {Schema} = mongoose;

const assig = new Schema({

    createdBy : {type:mongoose.Schema.Types.ObjectId, ref:'Teacher', required:true},
    createdAt: {type:Date, default: Date.now},
    dueBy: {type:Date , required:true},
    title: {type:String, required:true},
    type: {type:String, required:true, enum: ['homework', 'evaluation']},
    status:{type:String, enum: ["open", "closed"], default:"open" },
    maxGrade: {type:Number, min:0, max:100},
    description: {type:String, required:true}
    
})

const Assignment = mongoose.model('Assignments', assig);

module.exports = Assignment;