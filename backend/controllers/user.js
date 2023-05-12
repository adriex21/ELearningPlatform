const User = require('../models/Users');
const jwt = require('jsonwebtoken')
const moment = require('moment')
const bcrypt = require('bcryptjs');

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
                    const newUser = new User({
                        firstName,
                        lastName,
                        password,
                        email,
                        role
                    });

                    bcrypt.genSalt(10, (err,salt)=>{
                        bcrypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err;
                            newUser.password=hash;
                            newUser
                            .save()
                            .then(user=>{
                                res.send({msg:'User was created'});
                            })
                            .catch(err=>console.log(err))
                        })
                    })
                }
            })
        
    },

    login: async(req,res) => {
     
        let user = await User.findOne({email:req.body.email});

        if(user) {
            let valid = await bcrypt.compare(req.body.password, user.password);
            if(valid) {
                const expires = moment().add(10,'days');
                const token = generateToken(user._id,expires);
                res.send({ok:true, id:user._id, token:token});
            } 
            else {
                res.send({ok:false, msg:"Password/email doesn't match"});
            }
        } 
        else {
            res.send({ok:false, msg:"User doesn't exist"});
        }
    }
}

module.exports = controller;

