/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import {toast} from 'sonner';
import Button from '../components/buttons/Button';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser, reset } from '../store/features/auth/authSlice';
import SignUpIcon from '../../public/images/login-icon.png';
import { Meta } from '../components/Meta';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email must be valid').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should have a minimum length of 8')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    .required('Password is required'),
});

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useAppSelector((state) => state.auth);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("Login successful!");
      navigate('/dashboard');
      formik.resetForm();
      dispatch(reset());
    }
  }, [isError, isSuccess, message, navigate, dispatch, formik, user]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleBlur = (e: any) => {
    formik.handleBlur(e);
    if (!formik.values.password) {
      setIsFocused(false);
    }
  };

  return (
    <>
      <Meta title="Login - E-Commerce Ninjas" />
      <div className="wrapper">
        <div className="container">
          <div className="login-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="left-side-login">
                <div className="left-side-text">
                  <h1>Login to e-commerceNinjas account</h1>
                  <p>Simplify your e-commerce account with our user-friendly website.</p>
                </div>
                <div className="img">
                  <img src={SignUpIcon} alt="login-icon" />
                </div>
              </div>
              <div className="right-side-login">
                <div className="right-side-text">
                  <h1>Login to your account</h1>
                  <p>Please login to continue</p>
                </div>
                <div className="form-box">
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (<p className="error">{formik.errors.email}</p>) : null}
                  </div>
                  <div className="input-box">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="Password"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      onFocus={() => setIsFocused(true)}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (<p className="error">{formik.errors.password}</p>) : null}
                    {isFocused && (
                      <span className="hide" onClick={togglePasswordVisibility}>
                        {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
                      </span>
                    )}
                  </div>
                </div>
                {isLoading ? (
                  <div className="btn-loading">
                    <CircleLoader color="#FF6D18" size={30} loading={isLoading} />
                  </div>
                ) : (
                  <div className="btn">
                    <Button title="Login" type="submit" />
                  </div>
                )}
                <div className="forgot-link">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="sign-up-link">
                  <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </p>
                </div>
                <div className="or-divider">
                  <hr />
                  <span>OR</span>
                  <hr />
                </div>
                <div className="google">
                    <FcGoogle className="google-icon" />
                    <p>Continue with google</p>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

