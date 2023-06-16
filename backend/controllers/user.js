const User = require('../models/Users');
const jwt = require('jsonwebtoken')
const moment = require('moment')
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const Assignment = require('../models/Assignments');
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
        ).then(user =>{
            res.status(200).send(user);
        }).catch(err => {
            res.status(500).send(err);
            res.status(404).json({ msg: "User doesn't exist" });
        })
    },

    getAssignments: async(req,res) => {

        Assignment.find({

        }).then((assignments) => {
            res.status(200).send(assignments);
        }).catch(err => {
            res.status(500).send(err)
        })
    },


    getAssignment: async (req, res) => {

          const assignment = await Assignment.findById(req.params.id);
      
          if (assignment) {
            return res.status(200).json(assignment);
          } else {
            return res.status(404).json({ error: 'Assignment not found' });
          }
        
      }

}

module.exports = controller;

