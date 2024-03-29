const User = require('../models/Users');
const jwt = require('jsonwebtoken')
const moment = require('moment')
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const Assignment = require('../models/Assignments');
const Submission = require('../models/Submission');
const Course = require('../models/Courses');
require('dotenv').config();


const generateToken = (userId, expires, secret = 'secret') => {
    const payload = {
        sub:userId,
        iat:moment().unix(),
        exp:expires.unix(),
    };
    return jwt.sign(payload,secret);
};

const controller = {
    
    register: async(req, res) => {

        const{firstName,lastName,email,password,role} = req.body;
        
            User.findOne({email:email}).then(user => {
                if(user) {
                    res.send({msg:'User already exists'});
                } else {
                     User.create({
                        firstName,
                        lastName,
                        password,
                        email,
                        role
                    }); 

                   res.status(200).json({message:"User Created"});

                }
            })
    },

    login: async (req, res) => {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.AES_ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
            let valid = await bcrypt.compare(req.body.password, hashedPassword);
            if (valid) {
                const expires = moment().add(10, 'days');
                const token = generateToken(user._id, expires);
                res.status(200).json({ ok: true, id: user._id, token: token });
            } else {
                res.status(401).json({ ok: false, message: "Password/email doesn't match" });
            }
        } else {
            res.status(404).json({ ok: false, message: "User doesn't exist" });
        }
    },

    getUser: async(req,res) => {
        User.findOne(
            { _id: req.user._id }
        ).populate('coursesManaged').populate('testScores.test').exec()
        .then(user =>{
            res.status(200).send(user);
        }).catch(err => {
            res.status(500).send(err);
            res.status(404).json({ msg: "User doesn't exist" });
        })
    },

    getAssignments: async(req,res) => {

        Assignment.find({}).populate('course').exec()
        .then((assignments) => {
            res.status(200).send(assignments);
        }).catch(err => {
            res.status(500).send(err)
        })
    },


    getAssignment: async (req, res) => {
        try{
            const assignment = await Assignment.findById(req.params.id);

            if(!assignment) return res.status(502).json({ error: 'Assignment not found' });

            const submission = await Submission.find({
                submittedBy: req?.user?._id,
                submittedFor: assignment?.id
            });  
            
            return res.status(200).json({ 
                assignment,
                submission: submission,
            });
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
    },

    getCourses: async (req,res) => {

            Course.find({})
            .populate('instructor')
            .exec()
            .then((courses) => {
                return res.status(200).send(courses)
            })
            .catch(err=> {
                return res.status(500).send(err)
            })

        }, 

    getCourse: async(req, res) => {

        Course.findById(req.params.id)
        .then((course)=> {
            return res.status(200).send(course)
        })
        .catch(err => {
            return res.status(500).send(err)
        })
    }
    
}

module.exports = controller;

