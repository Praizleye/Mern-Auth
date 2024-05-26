const { register } = require("./auth.service");
const Joi = require("joi");


const registerController = async (req, res, next) => {
  try {

    

    // await register(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController };
// ts-custom-error
