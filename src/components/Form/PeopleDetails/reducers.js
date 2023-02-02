import { peopleDetailsActions } from 'utils/constant';

export const peopleDetailsInitialState = {
  clientName: '',
  collaborators: '',
  director: '',
  projectLead: '',
  errors: {},
};

export const peopleDetailsReducers = (state, { type, payload }) => {
  switch (type) {
    case peopleDetailsActions.TEXT:
      return { ...state, [payload.target.name]: payload.target.value };
    case peopleDetailsActions.SELECT:
      return {
        ...state,
        [payload.event.target.id.split('-')[0]]: payload.newValue,
      };
  }
};
