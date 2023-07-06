const mongoose = require('mongoose');
const {Schema} = mongoose;

const assignment = new Schema({

    createdBy : {type:mongoose.Schema.Types.ObjectId, ref:'Teacher', required:true},
    createdAt: {type:Date, default: Date.now},
    dueBy: {type:Date , required:true},
    title: {type:String, required:true},
    type: {type:String, required:true, enum: ['homework', 'evaluation']},
    status: {type:String, enum:['open', 'closed'], default: 'open'},
    maxGrade: {type:Number, min:0, max:100},
    description: {type:String, required:true},
    subsmissions:[{type:mongoose.Schema.Types.ObjectId, ref: 'Submission'}]
    
})

// Function to check and update assignment statuses
async function checkAndUpdateAssignmentStatuses() {
    const currentDate = new Date();
    const assignmentsToUpdate = await Assignment.find({ dueBy: { $lte: currentDate }, status: 'open' });
  
    for (const assignment of assignmentsToUpdate) {
      assignment.status = 'closed';
      await assignment.save();
    }
  }
  
  // Schedule the function to run every minute (adjust the interval as needed)
  setInterval(() => {
    checkAndUpdateAssignmentStatuses()
      .catch((error) => {
        console.error('Error checking and updating assignment statuses:', error);
      });
  }, 60000); // 60000 milliseconds = 1 minute

const Assignment = mongoose.model('Assignments', assignment);

module.exports = Assignment;