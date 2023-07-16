const User = require('../models/Users');
const Assignment = require('../models/Assignments');
const Submission = require('../models/Submission');
const { compare } = require('bcryptjs');
const { DateTime } = require('luxon');


const controller = {

    submit: async(req,res) => {

        const student = await User.findById(req.user._id);

        if(compare(student.role, "Student")) {
            const assignment = await Assignment.findById(req.params.id);
            if(assignment.status === 'closed') return res.status(400).send({msg:"Status closed"});

            const updatedSubmission = req.body.answer
            let submission = await Submission.findOneAndUpdate({submittedBy: req.user._id, submittedFor:req.params.id}, {answer: updatedSubmission, submittedAt: DateTime.now()}, {new:true})

            if(submission) {
                
                assignment.subsmissions.push(submission);
                assignment.save();
                return res.status(200).send(submission);

            } else {

                submission = await Submission.create({submittedBy: req.user._id, submittedFor: req.params.id, answer:req.body.answer, submittedAt: DateTime.now()});
                assignment.subsmissions.push(submission);
                assignment.save();
                return res.status(200).send(submission);
            }
            
        }
    },

    timer: async(req,res) => {

        const student = await User.findById(req.user._id);

        if(compare(student.role, "Student")) {
            const assignment = await Assignment.findById(req.params.id);
            if(assignment.status === 'closed') return res.status(400).send({msg:"Status closed"});
            const time = DateTime.now();
            let submission = await Submission.findOne({submittedBy: req.user._id, submittedFor:req.params.id});
            if(submission) {
                return res.status(200).send(submission)
            } else {
                submission = await Submission.create({submittedBy: req.user._id, submittedFor: req.params.id, startTime:time,endTime:time.plus({minutes:assignment.timer})});
                return res.status(200).send(submission)
            }
             
        }
    }
}

module.exports = controller;