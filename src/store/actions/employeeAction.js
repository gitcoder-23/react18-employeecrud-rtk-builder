import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootApi } from '../../RootApi';

export const getAllEmployees = createAsyncThunk('employee/get', async () => {
  // const response = await axios.get(`${baseUrl}/employees`);
  const response = await RootApi.get(`/employees`);
  // console.log('response-a', response);
  return response.data.reverse();
});

export const viewEmployee = createAsyncThunk('employee/view', async (empId) => {
  const response = await RootApi.get(`/employees/${empId}`);
  // console.log('response-v', response);
  return response.data;
});

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (empId) => {
    const response = await RootApi.delete(`/employees/${empId}`);
    // console.log('response', response);
    // useDispatch(getAllUsers());
    return response.data;
  }
);
