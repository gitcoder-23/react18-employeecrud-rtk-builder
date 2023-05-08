import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { viewEmployee } from '../store/actions/employeeAction';

const EmployeeDetail = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { empId } = useParams();

  useEffect(() => {
    dispatch(viewEmployee(empId));
  }, [empId]);

  const { singleEmployee } = useSelector((state) => state.employee);
  // console.log('singleEmployee', singleEmployee);

  return (
    <div>
      <div className="container">
        <div className="card row py-4" style={{ textAlign: 'left' }}>
          <div className="card-title">
            <h2>
              <u>Employee Detail</u>
            </h2>
          </div>
          <div className="card-body"></div>

          {singleEmployee && (
            <div>
              <h2>
                The Employee name is : <b>{singleEmployee.employeename}</b>
              </h2>
              <h6>
                <b>Employee Id:</b> {singleEmployee.id}
              </h6>
              <h3>Contact Details</h3>
              <h5>Email is : {singleEmployee.email}</h5>
              <h5>Phone is : {singleEmployee.phone}</h5>
              <h5>
                Status :{' '}
                <span
                  style={{
                    color: `${
                      (singleEmployee.active == true) === false
                        ? 'red'
                        : 'green'
                    }`,
                  }}
                >
                  {' '}
                  {(singleEmployee.active == true) === false
                    ? 'Inactive'
                    : 'Active'}
                </span>
              </h5>
              <Link className="btn btn-secondary" to="/">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
