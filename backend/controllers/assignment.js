const Assignment = require("../models/Assignments");

const controller = {

    setTimer : async(req,res) => {

        try {
            const { id } = req.params;
            const { timer } = req.body;
        
            // Update the assignment document with the new timer value
            const assignment = await Assignment.findByIdAndUpdate(id, { timer }, { new: true });
        
            if (!assignment) {
              return res.status(404).json({ error: 'Assignment not found' });
            }
        
            return res.json({ message: 'Timer updated successfully' });
          } catch (error) {
            console.error('Error updating timer:', error);
            return res.status(500).json({ error: 'Internal server error' });
          }
    }


}

module.exports = controller;