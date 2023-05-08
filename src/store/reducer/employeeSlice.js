import { createSlice } from '@reduxjs/toolkit';
import { getAllEmployees } from '../actions/employeeAction';

const initialState = {
  allEmployees: [],
  // if no user found
  employeeContainer: [],
  isLoading: true,
  error: true,
  isError: {},
  isSuccess: false,
  message: '',
};

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: initialState,
  reducers: {},

  extraReducers: function (builder) {
    //Fetch All Employees

    builder.addCase(getAllEmployees.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = '';
    });

    builder.addCase(getAllEmployees.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      state.allEmployees = action.payload;
      state.message = '';
    });

    builder.addCase(getAllEmployees.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
      state.message = 'Something Went Wrong!';
    });
    // Add Employee
    // Edit Employee
    // View Employee
    // Delete Employee
  },
});

export default employeeSlice.reducer;
