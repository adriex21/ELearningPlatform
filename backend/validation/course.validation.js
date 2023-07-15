const Joi = require('joi');



const createCourse = {
    body:Joi.object().keys({
        name:Joi.string().required(),
        description:Joi.string()
    })
};

module.exports = {
    createCourse
};