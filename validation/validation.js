const Joi = require('joi');

//Joi validation
function validateUser(user)
{
    const JoiSchema = Joi.object({
      
        name: Joi.string()
                  .min(2)
                  .max(30)
                  .required(),

        surname: Joi.string()
                .min(2)
                .max(30)
                .required(),
                    
        email: Joi.string()
               .email()
               .min(5)
               .max(50)
               .optional(), 
                 
        password: Joi.string()
                     .min(8)
                     .max(16)
                     .required(),
                        
    }).options({ abortEarly: false });
  
    return JoiSchema.validate(user)
}

module.exports = validateUser;

