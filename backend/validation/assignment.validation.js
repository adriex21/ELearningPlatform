const Joi = require('joi');

const createAssignment = {
    body:Joi.object().keys({
        dueBy:Joi.date().greater(Date.now()).required(),
        title:Joi.string().required(),
        maxGrade:Joi.number().required().min(1).max(100),
        type:Joi.string().required().valid('homework', 'validation'),
        description:Joi.string().required()
    })
};


module.exports = {
    createAssignment,
};