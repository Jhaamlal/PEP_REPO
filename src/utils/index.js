import Joi from 'joi';
import { compile } from 'path-to-regexp';

export const pathToUrl = (path, params = {}) => compile(path)(params);

export const formValid = ({ basicDetails, peopleDetails, setIsFormValid }) => {
  for (const key in basicDetails) {
    const isValueAllExist = basicDetails[key].length >= 4;
    if (!isValueAllExist) {
      setIsFormValid((prev) => ({
        ...prev,
        basicDetails: false,
      }));
      break;
    } else {
      setIsFormValid((prev) => ({
        ...prev,
        basicDetails: true,
      }));
    }
  }
  for (const key in peopleDetails) {
    const isValueAllExist = peopleDetails[key].length >= 1;
    if (key === 'director') {
      const isValueAllExist =
        !!peopleDetails['director']?.['name']?.length >= 1;
      if (!isValueAllExist) {
        setIsFormValid((prev) => ({
          ...prev,
          peopleDetails: false,
        }));
        break;
      } else {
        setIsFormValid((prev) => ({
          ...prev,
          peopleDetails: true,
        }));
      }
    } else {
      if (!isValueAllExist) {
        setIsFormValid((prev) => ({
          ...prev,
          peopleDetails: false,
        }));
        break;
      } else {
        setIsFormValid((prev) => ({
          ...prev,
          peopleDetails: true,
        }));
      }
    }
  }
};

export const validateProperty = ({ event, BasicDetailSchema }) => {
  const { name, value } = event.target;
  const obj = { [name]: value };
  const subSchema = Joi.object({ [name]: BasicDetailSchema[name] });
  const result = subSchema.validate(obj);
  const { error } = result;
  return error ? error.details[0].message : null;
};
