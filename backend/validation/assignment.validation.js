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

const editAssignment = {
    body:Joi.object().keys( {
        title:Joi.string(),
        description:Joi.string(),
        maxGrade:Joi.number(),
        dueBy:Joi.date().greater(Date.now()),
        type:Joi.string().valid('homework', 'validation'),
    })
}


module.exports = {
    createAssignment,
    editAssignment
};