const joi = require('joi');
const passwordComplexity = require('joi-password-Complexity');
const signUpValidation = (body) => {
    const schema = joi.object({
      name: joi.string().required().label('USER NAme'),
      email: joi.string().required().label('email'),
      password: passwordComplexity().required().label('password'),
    });
    return schema.validate(body);
  };

  const loginValidate = (body) => {
  const schema = joi.object({
    email: joi.string().required().label('email'),
    password: joi.string().required().label('password'),
  });
  return schema.validate(body);
};
const refreshToken=(body)=>{
  const schema = joi.object({
    refreshToken: joi.string().required().label('RefreshToken'),
  
  });
  return schema.validate(body);
}

  module.exports = {signUpValidation,loginValidate,refreshToken};
  
  