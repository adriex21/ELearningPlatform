const { compare } = require('bcryptjs');
const User = require('../models/Users');
const Assignment = require('../models/Assignments');
const Submission = require('../models/Submission');
const Course = require('../models/Courses');



const controller = {

    createAssignment : async (req,res) => {

        const teacher = await User.findById(req.user._id);

        if(compare(teacher.role, "Teacher")) {

            const course = await Course.findById(req.params.id);
            if(!course) return res.status(404).send({msg: "Course not found"});

    
            const assignment = await Assignment.create({createdBy: req.user._id, title: req.body.title, course:req.params.id,
            type:req.body.type, dueBy: req.body.dueBy, maxGrade: req.body.maxGrade, description:req.body.description, timer:req.body.timer});
            if(!assignment) return res.status(500).send({ msg: "It didn't work" });
            course.assignments.push(assignment);
            course.save();
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
    
    

    gradeSubmission : async(req,res) => {

        try {

            const teacher = await User.findById(req.user._id);

            if(compare(teacher.role, "Teacher")) {

                const updatedSubmission = req.body;
                let submission = await Submission.findById(req.params.id);
                const assignment = await Assignment.findById(submission.submittedFor)

                if(req.body.grade > assignment.maxGrade ) {

                    return res.status(400).json({error: "Please input a grade lower than the maximum value " + assignment.maxGrade});

                }
                
                submission = await Submission.findByIdAndUpdate(req.params.id, updatedSubmission , {new:true});

                const user = await User.findById(submission.submittedBy);
                if(!user) return res.status(400).send({msg:"User not found"});

                const existingTestIndex = user.testScores.findIndex(
                    (score) => score.test.toString() === submission._id.toString()
                  );
            
                  if (existingTestIndex !== -1) {
                    // Update the existing test score
                    user.testScores[existingTestIndex].score = req.body.grade;
                    
                  } else {
                    // Add a new test score entry
                    user.testScores.push({
                      course: assignment.course,
                      test: submission._id,
                      score: req.body.grade,
                    });
                  }

                await user.save();
                
                if(!submission) return res.status(502).json({error : 'Submission not found'});
                return res.status(200).json(submission);

            }

        } catch {
            return res.status(502).json({error: 'Something went wrong'})
        }
    },

    createCourse : async(req,res) => {

        try{

            const teacher = await User.findById(req.user._id);

            if(compare(teacher.role, "Teacher")) {

                const course = await Course.create({instructor: req.user._id, name: req.body.name, description:req.body.description});
                   if(!course) return res.status(500).send({ msg: "It didn't work" });
                   teacher.coursesManaged.push(course);
                   await teacher.save();
                   return res.status(200).send(course);
                
            }

        } catch {
            return res.status(502).json({error: 'Something went wrong'})
        }
    },

    createModule: async(req,res) => {

        try{

            const teacher = await User.findById(req.user._id);

            if(compare(teacher.role, "Teacher")) {

                let course = await Course.findById(req.params.id);
                if(!course) return res.status(404).send({ msg: "Course not found" });
                const module = req.body;
                
                course.modules.push(module);
                const updatedCourse = await course.save();
                return res.status(200).json(updatedCourse);
                
            }


        } catch(error) {
            console.log(error)
            return res.status(500).json({error:'Something went wrong'})
        }
    }

    
}

module.exports = controller;


