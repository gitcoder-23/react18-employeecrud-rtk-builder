import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootApi } from '../../RootApi';

export const getAllEmployees = createAsyncThunk('employee/get', async () => {
  // const response = await axios.get(`${baseUrl}/employees`);
  const response = await RootApi.get(`/employees`);
  // console.log('response', response);
  return response.data.reverse();
});
