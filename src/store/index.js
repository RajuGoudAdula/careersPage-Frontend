// File: src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import companyReducer from './companySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companyReducer,
  },
});

export default store;
