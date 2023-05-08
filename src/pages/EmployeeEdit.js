import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateEmployee, viewEmployee } from '../store/actions/employeeAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToastMessage from '../components/ToastMessage';

const EmployeeEdit = () => {
  const { empId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(viewEmployee(empId));
  }, [empId]);

  const { singleEmployee } = useSelector((state) => state.employee);
  // console.log('singleEmployee-->', singleEmployee);

  const [employeeEditForm, setEmployeeEditForm] = useState({
    id: singleEmployee.id || '',
    employeename: singleEmployee.employeename || '',
    email: singleEmployee.email || '',
    phone: singleEmployee.phone || '',
  });
  const [active, setActivechange] = useState(singleEmployee.active || false);

  // fixed state
  useEffect(() => {
    if (singleEmployee) {
      setEmployeeEditForm({ ...singleEmployee });
      setActivechange(singleEmployee.active);
    }
  }, [singleEmployee]);

  const onTextFieldChange = (e) => {
    setEmployeeEditForm({
      ...employeeEditForm,
      [e.target.name]: e.target.value,
    });
    // console.log('onTextFieldChange', studentState);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (
      !employeeEditForm.employeename ||
      !employeeEditForm.email ||
      !employeeEditForm.phone
      // active === false
    ) {
      toast.warn('Please fill all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      let formData = {
        employeename: employeeEditForm.employeename,
        email: employeeEditForm.email,
        phone: employeeEditForm.phone,
        active: active,
      };
      console.log('formData->', formData);
      dispatch(
        updateEmployee({ editEmp: formData, empId: singleEmployee.id ?? empId })
      );

      toast.success('Form edited success!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        setEmployeeEditForm({
          employeename: '',
          email: '',
          phone: '',
        });
        setActivechange(false);
        navigate('/');
      }, 1000);
    }
  };

  return (
    <>
      <div className="container">
        <ToastMessage />{' '}
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
              <div className="card" style={{ textAlign: 'left' }}>
                <div className="card-title">
                  <h2>Employee Edit</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          value={employeeEditForm.id}
                          disabled="disabled"
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          required
                          name="employeename"
                          id="employeename"
                          value={employeeEditForm.employeename}
                          onChange={(e) => onTextFieldChange(e)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          name="email"
                          id="email"
                          value={employeeEditForm.email}
                          onChange={(e) => onTextFieldChange(e)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          name="phone"
                          id="phone"
                          value={employeeEditForm.phone}
                          onChange={(e) => onTextFieldChange(e)}
                          className="form-control"
                        ></input>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-check">
                        <input
                          checked={active}
                          onChange={(e) => setActivechange(e.target.checked)}
                          type="checkbox"
                          className="form-check-input"
                        ></input>
                        <label className="form-check-label">
                          {' '}
                          {active === false ? 'Inactive' : 'Active'} Employee
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-success" type="submit">
                          Save
                        </button>{' '}
                        &nbsp;
                        <Link to="/" className="btn btn-secondary">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeEdit;
