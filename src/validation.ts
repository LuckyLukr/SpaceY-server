const Joi = require('joi');

//Register Validation
const registerValidation = data => {

    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        age: Joi.number().required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,100}$")),
        repeatPassword: Joi.ref('password'),
        role: Joi.string().required()
    })
    return schema.validate(data);
}

//Login Validation
const loginValidation = data => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;