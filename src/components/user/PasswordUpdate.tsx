/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store/store';
import { updatePassword } from '../../store/features/user/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { TailSpin } from 'react-loader-spinner';
import { logout } from '../../store/features/auth/authSlice';
import { disconnect } from '../../utils/socket/socket';
import { useNavigate } from 'react-router-dom';

const passwordSchema = Yup.object({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .notOneOf([Yup.ref('oldPassword')], 'New password cannot be the same as the old password'),
  confirmNewPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const PasswordUpdate = ({ message, isError, isSuccess }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const newPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const confirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword)
  }

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      try{
        setTimeout(()=>{
          setLoading(true)
        },200)
        dispatch(updatePassword(values));
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
        toast.success("Password updated Successfully you will be logged out in few second ")
        setTimeout(()=>{
          dispatch(logout())
          disconnect()
        },4000)
        setTimeout(()=>{
          navigate("/login")
        }, 5500)
      }

    },
  });

  return (
    <form className="password-container" onSubmit={formik.handleSubmit}>
    <div className="title">
      <h1>MY PASSWORD</h1>
      <button type='submit'>
          {loading ? (
            <div className="spinner-container">
              <TailSpin color="#ff6d18" width={20} />
            </div>
          ) : (
            "Save Changes"
          )}
      </button>
    </div>
    <div className="password">
      <div className='password-layout'>
        <div className="password-inp">
          <label htmlFor="oldPassword">Old Password</label>
          <div className="input-n">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field1"
              placeholder=" "
              name="oldPassword"
              id="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={newPasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>

          </div>
          {formik.errors.oldPassword && <div className='error'>{formik.errors.oldPassword}</div>}
        </div>
      </div>
      <div>
        <div >
          <div className='conf-pwd'>
            <div className="password-inp">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-n">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input-field2"
                  placeholder=" "
                  name='newPassword'
                  id="newPassword"
                  required
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={confirmPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formik.errors.newPassword && <div className='error'>{formik.errors.newPassword}</div>}
            </div>
            <div className="password-inp">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <div className="input-n">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  className="input-field2"
                  placeholder=" "
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  value={formik.values.confirmNewPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={confirmNewPasswordVisibility}
                >
                  <FontAwesomeIcon icon={showConfirmNewPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formik.errors.confirmNewPassword && <div className='error'>{formik.errors.confirmNewPassword}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
    {formik.status && <div className='status'>{formik.status}</div>}
  </form>
  );
};

export default PasswordUpdate;
