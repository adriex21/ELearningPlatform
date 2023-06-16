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
}

module.exports = controller;


