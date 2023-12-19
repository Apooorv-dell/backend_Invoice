const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi)

function validateOwnerId(ownerId) {
    const schema = Joi.object({
      ownerId: Joi.objectId().required(),
     
 });
  
    return schema.validate(ownerId);
}


exports.validateOwnerId = validateOwnerId;
