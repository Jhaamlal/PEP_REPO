const Joi = require('joi');

export const BasicDetailSchema = {
  projectName: Joi.string().min(3).max(30).required(),
  projectType: Joi.string().min(4).required(),
  startDate: Joi.string().min(4).required(),
  endData: Joi.string().min(4).required(),
  descriptions: Joi.string().required(),
};
const myRegexPattern = new RegExp(/[^a-zA-Z0-9 ]/);

export const chargeCodeSchema = Joi.object({
  field: Joi.string().min(6).regex(myRegexPattern, { invert: true }).message({
    'string.pattern.invert.base': 'Special character is Not allowed',
    'string.min': 'length must be of 6 char',
  }),
});
