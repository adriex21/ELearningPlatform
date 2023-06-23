const User = require('../models/Users');
const Assignment = require('../models/Assignments');
const Submission = require('../models/Submission');
const { compare } = require('bcryptjs');


const controller = {

    submit: async(req,res) => {

        const student = await User.findById(req.user._id);

        if(compare(student.role, "Student")) {

            const assignment = await Assignment.findById(req.params.id);


            const submission = await Submission.create({submittedBy: req.user_id, submittedFor: req.params.id, answer:req.body.answer});
            if(!submission) return res.status(500).send({msg: "It didnt work"});
            return res.status(200).send(submission);
        }
    },
}

module.exports = controller;