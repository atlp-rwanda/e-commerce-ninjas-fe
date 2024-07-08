/* eslint-disable */
import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate , useLocation} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CircleLoader, PuffLoader } from 'react-spinners';
import { resetPassword } from '../store/features/auth/authSlice';
import { useFormik } from 'formik';
import '../styles/reset-password.scss';
import { toast } from 'react-toastify';
import Button from '../components/buttons/Button';
import Header from '../components/layout/Header';
import * as Yup from 'yup';

const ResetPassword: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const newPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isError, isSuccess, isLoading, message } = useAppSelector((state) => state?.auth);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
      } 
      else{
        const pathParts = location.pathname.split('/');
        const token = pathParts[pathParts.length - 1];
        dispatch(resetPassword({ token, password: values.password }));
      }  
    },
  })
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message)
      navigate('/login');
    }
  }, [user, isError, isSuccess, isLoading, message])

  return (
    <>
    <hr />
      <main>
        <form className="resetPasswordForm" onSubmit={formik.handleSubmit}>
          <h1>Reset password</h1>
          <div className="input-containers">
            <div className="input-container1">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="input-field1"
                placeholder=" "
                name='password'
                id="newPassword"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="input-label1" htmlFor="newPassword">New password</label>
              <button
                type="button"
                className="toggle-password"
                onClick={newPasswordVisibility}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="input-container2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="input-field2"
                placeholder=" "
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="confirmPassword"
                required
              />
              <label className="input-label2" htmlFor="confirmPassword">Confirm password</label>
              <button
                type="button"
                className="toggle-password"
                onClick={confirmPasswordVisibility}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {isLoading ? (
                <div className='btn-loading'>
                    <PuffLoader size={60} color='#FF6D18' loading={isLoading} />
                  </div>
                ) : (
                  <div className="reset-Button">
                    <Button title="Reset Password" type="submit" />
                 </div>
                )}
            </div>
        </form>
      </main><br/><br/><br/><br/><br/><br/>
    </>
  );
};
export default ResetPassword;
