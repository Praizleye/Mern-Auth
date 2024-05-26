const joi = require("joi");

const registerSchema = joi.object({
  firstName: joi.string().min(2).max(55).required(),
  lastName: joi.string().min(2).max(55).required(),
  email: joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    role: joi.string().valid("user", "admin", "super-admin").default("user"),
  
});