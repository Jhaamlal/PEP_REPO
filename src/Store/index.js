import { configureStore } from '@reduxjs/toolkit';

import leversReducers from './Features/LeverSlice';

const store = configureStore({
  reducer: {
    levers: leversReducers,
  },
});

export default store;
