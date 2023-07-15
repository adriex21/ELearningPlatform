
const Submission = require("../models/Submission");

const controller = {
  setTimer: async (req, res) => {
    try {
      const { id } = req.params;
      const { timer } = req.body;

      // Update the submission document with the new timer value
      const submission = await Submission.findByIdAndUpdate(
        id,
        { timer },
        { new: true }
      );

      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }

      return res.json({ message: 'Timer updated successfully' });
    } catch (error) {
      console.error('Error updating timer:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = controller;