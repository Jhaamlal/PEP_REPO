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

export const sectorsData = ({ leverData }) => {
  const selectedSectorsData = {};
  leverData?.map((item, index) => {
    const isKeyExist = selectedSectorsData.hasOwnProperty(item['segment']);
    if (isKeyExist) {
      const newObj = {
        name: item['name'],
        category: item['category'],
        location: item['location'],
        description: item['description'],
        id: item['uuid'],
        sector: item['sector'],
        segment: item['segment'],
      };
      selectedSectorsData[item['segment']].push(newObj);
    }
    if (!isKeyExist) {
      selectedSectorsData[item['segment']] = [];
    }
  });

  return selectedSectorsData;
};

export const allSectorsData = ({ levers }) => {
  const leverObject = {};
  levers?.map((item, index) => {
    const isSectorExist = leverObject.hasOwnProperty(item['sector']);

    if (isSectorExist) {
      const isSegemntExist = leverObject?.[item['sector']]?.hasOwnProperty(
        item['segment'],
      );
      if (isSegemntExist) {
        leverObject[item['sector']]['total'] += 1;
        leverObject[item['sector']][item['segment']] += 1;
      }
      if (!isSegemntExist) {
        leverObject[item['sector']] = {
          ...leverObject[item['sector']],
          [item['segment']]: 0,
        };
      }
    } else {
      leverObject[item['sector']] = {
        total: 0,
        [item['segment']]: 0,
      };
    }
    return '';
  });
  delete leverObject['DuMmY'];
  delete leverObject['Test'];

  return leverObject;
};

export const selectedSegment = ({ selector }) => {
  const selectedItem = {};
  for (const sector of Object.entries(selector)) {
    if (typeof sector[1] === 'object') {
      for (const segment of Object.entries(sector[1])) {
        if (typeof segment[1] === 'object') {
          selectedItem[segment[0]] = {
            ...segment[1]['selectedChild'],
          };
        }
      }
    }
  }
  return selectedItem;
};
