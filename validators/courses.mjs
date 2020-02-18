import Joi from "@hapi/joi";

export const courseValidator = Joi.object({
    title: Joi.string().min(3).max(1024).required(true),
    from : Joi.date().default(Date.now), 
    to : Joi.date().default(Date.now), 
    capacity: Joi.number().default(50),
    instructor: Joi.string()

})