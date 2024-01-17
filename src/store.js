import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slice';
import addressReducer from './addressSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    address: addressReducer,
  },
});
