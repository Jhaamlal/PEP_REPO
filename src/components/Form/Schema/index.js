// const Joi = require('joi');
const Joi = require('joi');

export const BasicDetailSchema = {
  projectName: Joi.string().min(3).max(30).required(),
  projectType: Joi.string().min(4).required(),
  startDate: Joi.string().min(4).required(),
  endData: Joi.string().min(4).required(),
  descriptions: Joi.string().required(),
};
const myRegexPattern = new RegExp(/^.*[<>{}].*$/s);

export const chargeCodeSchema = Joi.object({
  field: Joi.string()
    .custom((value, helpers) => {
      return myRegexPattern.test(value) ? helpers.error('any.invalid') : value;
    })
    .messages({
      'any.invalid': "Whooaaa! That's a Bad String",
    }),
});

export const descriptionSchema = Joi.object({
  field: Joi.string().min(0).max(6).label('Description'),
});
