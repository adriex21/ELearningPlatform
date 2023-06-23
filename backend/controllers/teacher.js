const { compare } = require('bcryptjs');
const User = require('../models/Users');
const Assignment = require('../models/Assignments');



const controller = {

    createAssignment : async (req,res) => {

        const teacher = await User.findById(req.user._id);

        if(compare(teacher.role, "Teacher")) {
    
           const assignment = await Assignment.create({ createdBy: req.user._id, title: req.body.title, type:req.body.type, dueBy: req.body.dueBy, maxGrade: req.body.maxGrade, description:req.body.description});
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
    }
}

module.exports = controller;


