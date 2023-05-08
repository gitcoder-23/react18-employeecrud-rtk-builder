import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ToastMessage from '../components/ToastMessage';
import { getAllEmployees } from '../store/actions/employeeAction';

import Loader from '../components/Loader';

const EmployeeList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  const { allEmployees, isLoading, error, isSuccess, message } = useSelector(
    (state) => state.employee
  );

  console.log('allEmployees->', allEmployees);

  return (
    <>
      <div className="container">
        <ToastMessage />
        <div className="card">
          <div className="card-title">
            <h1>
              Employee List{' '}
              <Link to={'/employee/create'} className="btn btn-success">
                Add New (+)
              </Link>
            </h1>
            <div className="card-body">
              {isLoading ? (
                <Loader />
              ) : message ? (
                <>
                  <h1>{message}</h1>
                </>
              ) : (
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <td>ID</td>
                      <td>Employee Name</td>
                      <td>Email</td>
                      <td>Phone</td>
                      <td>Status</td>
                      <td colSpan={2}>Action</td>
                    </tr>
                  </thead>

                  {allEmployees &&
                    allEmployees?.map((eData, indx) => (
                      <tbody key={indx}>
                        <tr>
                          <td>{indx + 1}</td>
                          <td>{eData.employeename}</td>
                          <td>{eData.email}</td>
                          <td>{eData.phone}</td>
                          <td>
                            <span
                              style={{
                                color: `${
                                  eData.active === false ? 'red' : 'green'
                                }`,
                              }}
                            >
                              {' '}
                              {eData.active === false ? 'Inactive' : 'Active'}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => {}}
                              type="button"
                              className="btn btn-info"
                            >
                              View
                            </button>{' '}
                            &nbsp;
                            <button
                              onClick={() => {}}
                              type="button"
                              className="btn btn-warning"
                            >
                              Edit
                            </button>{' '}
                            &nbsp;
                            <button
                              onClick={() => {}}
                              type="button"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
