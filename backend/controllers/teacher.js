const { compare } = require('bcryptjs');
const User = require('../models/Users');
const Assignment = require('../models/Assignments');
const Submission = require('../models/Submission');



const controller = {

    createAssignment : async (req,res) => {

        const teacher = await User.findById(req.user._id);

        if(compare(teacher.role, "Teacher")) {
    
           const assignment = await Assignment.create({ createdBy: req.user._id, title: req.body.title, 
            type:req.body.type, dueBy: req.body.dueBy, maxGrade: req.body.maxGrade, description:req.body.description});
           if(!assignment) return res.status(500).send({ msg: "It didn't work" });
           return res.status(200).send(assignment);

        } 
    },

    editAssignment: async (req,res) => {

        const teacher = await User.findById(req.user._id);
        const updatedAssignment = req.body;
        if(compare(teacher.role, "Teacher")) {
            const assignment = await Assignment.findByIdAndUpdate(req.params.id, updatedAssignment, {new:true});
            return res.send(assignment).status(200);
        }
    },

    getSubmissions: async (req, res) => {
        
        try{
            const assignment = await Assignment.findById(req.params.id);

            if(!assignment) return res.status(502).json({ error: 'Assignment not found' });

            const submission = await Submission.find({"submittedFor": assignment._id}).populate('submittedBy').exec();
            
            return res.status(200).json(submission);
        }
        catch {
            return res.status(502).json({ error: 'Something went wrong' });
        }
    },
    
    getSubmission : async(req,res) => {

        try{

            const submission = await Submission.findById(req.params.id).populate('submittedFor').exec();
            if(!submission) return res.status(502).json({error : 'Submission not found'});
            return res.status(200).send(submission);
            
        } catch {
            return res.status(502).json({error: 'Something went wrong'})
        }
    }

    
}

module.exports = controller;


