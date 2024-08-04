/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser } from '../store/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { addProductToWishlist } from '../store/features/wishlist/wishlistSlice';
import authService from '../store/features/auth/authService';
import { joinRoom } from '../utils/socket/socket';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function UserLogin() {
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    isError,
    isSuccess,
    isAuthenticated,
    token,
    error,
    message,
  } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email } = values;
      localStorage.setItem('loggedEmail', email);
      const action = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(action)) {
        const pendingWishlistProduct = localStorage.getItem(
          'pendingWishlistProduct'
        );
        if (pendingWishlistProduct) {
          await dispatch(addProductToWishlist(pendingWishlistProduct));
          localStorage.removeItem('pendingWishlistProduct');
        }
      }
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(
    function () {
      if (isSuccess && token && isAuthenticated) {
        localStorage.setItem('token', token);
        toast.success(message);
        navigate('/home');
        formik.resetForm();
        joinRoom(token);
      }
    },
    [error, isAuthenticated, isError, isSuccess, token]
  );

  function handleIsFocused() {
    setIsFocused(true);
    setIsClicked(false);
  }

  function handleIsVisible() {
    setIsVisible((isVisible) => !isVisible);
  }

  return (
    <section className="section__login">
      <div className="mini-container login">
        <div className="login__left">
          <p className="login__heading">
            Login to your account to access our platform
          </p>
          <p className="login__text">
            Simplify your e-commerce account with our user-friendly website.
          </p>
          <img
            src="../assets/images/loginPhoto.png"
            alt="login picture"
            className="login__img"
          />
        </div>
        <div className="login__right">
          <header className="login__header">
            <p className="login__heading">Welcome back</p>
            <p className="login__secondary">Please login to your account</p>
          </header>
          <form className="login__form form" onSubmit={formik.handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="form__input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => setIsClicked(false)}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form__group">
              <input
                type={isVisible ? 'text' : 'password'}
                placeholder="Password"
                className="form__input"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={handleIsFocused}
                onBlur={formik.handleBlur}
              />
              {isFocused ? (
                isVisible ? (
                  <BiSolidShow
                    className="form__icon"
                    onClick={handleIsVisible}
                  />
                ) : (
                  <BiSolidHide
                    className="form__icon"
                    onClick={handleIsVisible}
                  />
                )
              ) : (
                ''
              )}
              <p className="form__text">
                <Link to="/reset-password" className="form__link">
                  Forgot password
                </Link>
              </p>
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : isError && isClicked ? (
              <p className="error">{error}</p>
            ) : null}
            <button
              type="submit"
              className={`btn form__btn${isLoading ? ' loading' : ''}`}
              disabled={isLoading}
              onClick={() => setIsClicked(true)}
            >
              <span>{isLoading ? 'Loading ' : 'Login'}</span>
              <PulseLoader size={6} color="#ffe2d1" loading={isLoading} />
            </button>
          </form>
          <p className="login__separator">or Login with</p>
          <div className="login__box" onClick={authService.googleAuth}>
            <FcGoogle className="login__social__icon" />
            <p className="login__social__text">Login with google</p>
          </div>
          <p className="login__register">
            New to e-commerce Ninjas?
            <Link to="/signup" className="login__link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
