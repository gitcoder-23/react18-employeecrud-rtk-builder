import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './reducer/employeeSlice';
export const store = configureStore({
  reducer: {
    employee: employeeSlice,
  },
});
