import { validateProperty } from 'utils';
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
    case basicDetailsActions.PROJECT_NAME:
      const { name, value } = payload.target;
      let errorData = { ...state.errors };
      const errorMessage = validateProperty({ payload, BasicDetailSchema });
      if (errorMessage) {
        errorData[name] = errorMessage;
      } else {
        delete errorData[name];
      }

      state.errors = { ...errorData };
      console.log('Ha bhai agya mai ', payload);
      let customerData = { ...state };
      customerData[name] = value;
      return { ...state, ...customerData };
      break;
    case basicDetailsActions.START_DATE:
      const changeFormate = `${payload.newValue['$y']}-${
        payload.newValue['$M'] + 1
      }-${payload.newValue['$D']}`;
      let itemTest = payload.dateType;
      console.log({ ...state, [itemTest]: changeFormate });
      return { ...state, startDate: changeFormate };
      break;
    default:
      break;
  }
};
