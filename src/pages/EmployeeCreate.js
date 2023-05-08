import React, { useEffect, useState } from 'react';
import ToastMessage from '../components/ToastMessage';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addNewEmployee } from '../store/actions/employeeAction';

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [active, setActivechange] = useState(false);
  const [validation, setValidation] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({
    id: uuidv4(),
    employeename: '',
    email: '',
    phone: '',
  });
  const onFieldChange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onFieldChange', employeeForm);
  };

  const submitClick = () => {
    if (
      !employeeForm.employeename ||
      !employeeForm.email ||
      !employeeForm.phone
      // active === false
    ) {
      setSuccess(false);
      toast.warn('Please fill all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let formData = {
        id: employeeForm.id,
        employeename: employeeForm.employeename,
        email: employeeForm.email,
        phone: employeeForm.phone,
        active: active,
      };
      console.log('formData->', formData);
      dispatch(addNewEmployee(formData));
      addSuccess();
    }
  };

  const { isSuccess } = useSelector((state) => state.employee);
  console.log('isSuccess-->', isSuccess);

  useEffect(() => {}, [isSuccess]);

  const addSuccess = () => {
    isSuccess === true ??
      toast.success('Form submitted success!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    setTimeout(() => {
      setEmployeeForm({
        employeename: '',
        email: '',
        phone: '',
      });
      setActivechange(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="container">
      <ToastMessage />
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <div className="container">
            <div className="card">
              <div className="card-title">
                <h2>Employee Add</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col col-lg-12 col-md-12 col-sm-12">
                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <label style={{ float: 'left', marginBottom: '4px' }}>
                          Employee Name
                        </label>
                        <input
                          id="employeename"
                          name="employeename"
                          required
                          value={employeeForm.employeename}
                          onMouseDown={(e) => setValidation(true)}
                          onChange={(e) => onFieldChange(e)}
                          className="form-control"
                          placeholder="Type name here"
                        />
                        {employeeForm.employeename.length === 0 &&
                          validation && (
                            <div style={{ textAlign: 'left' }}>
                              <span className="text-danger">
                                Enter employee name
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <label style={{ float: 'left', marginBottom: '4px' }}>
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          required
                          value={employeeForm.email}
                          onChange={(e) => onFieldChange(e)}
                          onMouseDown={(e) => setValidation(true)}
                          className="form-control"
                          placeholder="Type email here"
                        />
                        {employeeForm.email.length === 0 && validation && (
                          <div style={{ textAlign: 'left' }}>
                            <span className="text-danger">Enter email</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 mb-2">
                      <div className="form-group">
                        <label style={{ float: 'left', marginBottom: '4px' }}>
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          required
                          value={employeeForm.phone}
                          onChange={(e) => onFieldChange(e)}
                          onMouseDown={(e) => setValidation(true)}
                          className="form-control"
                          placeholder="Type phone here"
                        />
                        {employeeForm.phone.length === 0 && validation && (
                          <div style={{ textAlign: 'left' }}>
                            <span className="text-danger">Enter email</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 mb-2">
                      <div className="form-check">
                        <input
                          checked={active}
                          onChange={(e) => setActivechange(e.target.checked)}
                          type="checkbox"
                          className="form-check-input"
                        />
                        <label
                          className="form-check-label"
                          style={{ float: 'left', marginBottom: '4px' }}
                        >
                          {active == false ? 'Inactive' : 'Active'} Employee
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-12" style={{ width: '100%' }}>
                      <div className=" " style={{ float: 'left' }}>
                        <button
                          type="button"
                          onClick={submitClick}
                          className="btn btn-primary "
                        >
                          Submit
                        </button>
                        <Link to={'/'} className="btn btn-secondary mx-2">
                          Back
                        </Link>
                      </div>
                      {/* {message && (
                        <h3
                          className="pt-2"
                          style={{
                            color: `${success === true ? 'green' : 'red'}`,
                            fontSize: '18px',
                          }}
                        >
                          {message}
                        </h3>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
