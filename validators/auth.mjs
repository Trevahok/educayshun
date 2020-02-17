import Joi from "@hapi/joi";


export const loginValidator = Joi.object({
    email: Joi.string().email().required(true),
    password: Joi.string().min(6).max(1024).required(true),
})

export const signupValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    address: Joi.string().max(1024).required(false),
    role: Joi.string(),

})