import { createSlice } from '@reduxjs/toolkit';
import {
  addNewEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  viewEmployee,
} from '../actions/employeeAction';

const initialState = {
  allEmployees: [],
  singleEmployee: {},
  // if no user found
  employeeContainer: [],
  isLoading: true,
  error: true,
  isError: {},
  isSuccess: false,
  isAddSuccess: '',
  message: '',
};

const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: initialState,
  reducers: {
    getSuccess: (state, action) => {
      console.log('action-->', action.payload);
      state.isAddSuccess = action.payload;
    },
  },

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
      state.allEmployees = [];
      state.isError = action.payload;
      state.message = 'Something Went Wrong!';
    });

    // View Employee
    builder.addCase(viewEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = '';
    });

    builder.addCase(viewEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      state.singleEmployee = action.payload;
      state.message = '';
    });

    builder.addCase(viewEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.singleEmployee = {};
      state.isError = action.payload;
      state.message = 'Something Went Wrong!';
    });

    // Add Employee
    builder.addCase(addNewEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = '';
    });

    builder.addCase(addNewEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allEmployees = [...state.allEmployees, action.payload];
      state.isSuccess = true;
      state.error = false;
      state.message = 'Employee add success';
    });

    builder.addCase(addNewEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.allEmployees = action.payload;
      state.isSuccess = false;
      state.isError = action.payload;
      state.message = 'Something Went Wrong!';
    });

    // Edit Employee
    builder.addCase(updateEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = '';
    });

    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allEmployees = [...state.allEmployees, action.payload.id];
      state.isSuccess = true;
      state.error = false;
      state.message = 'Employee add success';
    });

    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.allEmployees = action.payload;
      state.isSuccess = false;
      state.isError = action.payload;
      state.message = 'Something Went Wrong!';
    });

    // Delete Employee
    builder.addCase(deleteEmployee.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      state.message = '';
    });

    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.isSuccess = true;
      state.allEmployees = [...state.allEmployees];
      state.message = 'Employee deleted';
    });

    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.isSuccess = false;
      state.isError = action.payload;
      state.message = 'Something Went Wrong!';
    });
  },
});

export const { getSuccess } = employeeSlice.actions;

export default employeeSlice.reducer;
