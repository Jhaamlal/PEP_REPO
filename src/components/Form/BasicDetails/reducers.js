import { validateProperty, validatePropertyReducer } from 'utils';
import { basicDetailsActions } from 'utils/constant';
import { BasicDetailSchema } from '../Schema/index';
export const basicDetailsInitialState = {
  projectName: '',
  projectType: '',
  startDate: '',
  endData: '',
  descriptions: '',
  errors: {},
};

export const basicDetailsReducers = (state, { type, payload }) => {
  switch (type) {
    case basicDetailsActions.DATE:
      const changeFormate = `${payload.newValue['$y']}-${
        payload.newValue['$M'] + 1
      }-${payload.newValue['$D']}`;
      let itemTest = payload.dateType;
      return { ...state, [itemTest]: changeFormate };
      break;
    default:
      const { name, value } = payload.target;
      let errorData = { ...state.errors };
      const errorMessage = validatePropertyReducer({
        payload,
        BasicDetailSchema,
      });
      if (errorMessage) {
        errorData[name] = errorMessage;
      } else {
        delete errorData[name];
      }

      state.errors = { ...errorData };
      let customerData = { ...state };
      customerData[name] = value;
      return { ...state, ...customerData };
  }
};
