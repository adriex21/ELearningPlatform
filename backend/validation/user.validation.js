const Joi = require('joi');

const userSignUp = {
    body:Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        password:Joi.string().required().min(3).max(15),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().messages({ 'any.only': 'Passwords must match' }),
        email:Joi.string().required().email(),
        role:Joi.string().required().valid('Student', 'Teacher')
    })
};

const userLogin = {
    body:Joi.object().keys({
        email:Joi.string().required(),
        password:Joi.string().required()
    })
}

module.exports = {
    userSignUp,
    userLogin
};