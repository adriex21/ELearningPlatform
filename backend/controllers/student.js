const User = require('../models/Users');
const Assignment = require('../models/Assignments');
const Submission = require('../models/Submission');
const { compare } = require('bcryptjs');


const controller = {

    submit: async(req,res) => {

        const student = await User.findById(req.user._id);

        if(compare(student.role, "Student")) {
            const assignment = await Assignment.findById(req.params.id);
            if(assignment.status === 'closed') return res.status(400).send({msg:"Status closed"});
            const submission = await Submission.create({submittedBy: req.user._id, submittedFor: req.params.id, answer:req.body.answer, timer:assignment.timer});
            assignment.subsmissions.push(submission);
            assignment.save();
            if(!submission || !assignment) return res.status(500).send({msg: "It didnt work"});
            return res.status(200).send(submission);
        }
    },
}

module.exports = controller;