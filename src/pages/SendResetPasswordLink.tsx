/* eslint-disable */
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import Header from '../components/layout/Header';
import Button from '../components/buttons/Button';
import { useAppDispatch, useAppSelector } from '../store/store';
import { sendResetLink } from '../store/features/auth/authSlice';
import '../styles/reset-password.scss';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { CircleLoader, PuffLoader } from 'react-spinners';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Email must be valid').required('Email is required'),
})
const SendResetPasswordLink: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isError, isSuccess, isLoading, message } = useAppSelector((state) => state?.auth);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
        dispatch(sendResetLink(values.email));
    },
  })
  useEffect(() => {
    if (isError) {
      toast.error(message)
     }
    if (isSuccess) {
      toast.success(message)
      formik.resetForm();
    }
  }, [user, isError, isSuccess, isLoading, message])
  return (
    <>
    <hr />
    <br/><br/>
     <main>
        <div className="resetPassword-Container">
          <h1>Get  Reset  Password  Link</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                className="input-field"
                placeholder=" "
                id="email"
                name="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className="input-label" id="email" htmlFor="email">Email Address</label>
            </div>
             {isLoading ? (
                <div className='btn-loading'>
                    <PuffLoader size={60} color='#FF6D18' loading={isLoading} />
                  </div>
                ) : (
                  <div className="reset-Button">
                    <Button title="Get Reset Link" type="submit" />
                 </div>
                )}
            
          </form>
        </div><br/>
      </main><br/><br/><br/><br/><br/><br/>
    </>
  );
};

export default SendResetPasswordLink;
