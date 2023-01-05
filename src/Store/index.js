import { configureStore } from '@reduxjs/toolkit';

import leversReducers from './Features/leverSlice';

const store = configureStore({
  reducer: {
    levers: leversReducers,
  },
});

export default store;
