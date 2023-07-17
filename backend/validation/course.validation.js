const Joi = require('joi');



const createCourse = {
    body:Joi.object().keys({
        name:Joi.string().required(),
        description:Joi.string()
    })
};

const createModule = {
    body:Joi.object().keys({
        title:Joi.string().required(),
        description:Joi.string(),
        content:Joi.string().required()
    })

}

module.exports = {
    createCourse,
    createModule

};