/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Meta } from "../components/Meta";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/buttons/Button";
import { useAppDispatch, useAppSelector } from "../store/store";
import { registerUser, resetAuth } from "../store/features/auth/authSlice";
import { HashLoader } from "react-spinners";
import SignUpIcon from "../../public/assets/images/sign-up.png";
import { toast } from "react-toastify";
import authService from "../store/features/auth/authService";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isError, isRegister, isLoading, message } = useAppSelector(
    (state) => state?.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const [isClicked, setIsClicked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showError, setShowError] = useState(isError);

  useEffect(() => {
    if (isRegister) {
      toast.success(message);
      navigate("/verify-email");
      formik.resetForm();
    }
  }, [user, isError, isRegister, isLoading, message, navigate]);

  useEffect(() => {
    setShowError(isError);
  }, [isError]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleBlur = (e: object) => {
    formik.handleBlur(e);
    if (!formik.values.password || !formik.values.email) {
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setShowError(false);
    setIsFocused(true);
  };



  return (
    <>
      <Meta title="Sign up - E-Commerce Ninjas" />
      <div className="wrapper">
        <div className="container">
          <div className="login-form">
            <form onSubmit={formik.handleSubmit} className="signup">
              <div className="left-side-login">
                <div className="left-side-text">
                  <h1>Create e-commerceNinjas account.</h1>
                  <p>
                    Simplify your e-commerce account with our user-friendly
                    website.
                  </p>
                </div>
                <div className="img">
                  <img src={SignUpIcon} alt="login-icon" />
                </div>
              </div>
              <div className="right-side-login">
                <div className="right-side-text">
                  <h1>Create an account</h1>
                  <p>Please create an account to continue</p>
                </div>
                <div className="form-box">
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      className="signup__input"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="error1">{formik.errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-box">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      className="signup__input"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="error1">{formik.errors.password}</p>
                    ) : null}
                    {isFocused && (
                      <span className="hide" onClick={togglePasswordVisibility}>
                        {passwordVisible ? <BiSolidHide /> : <BiSolidShow />}
                      </span>
                    )}
                  </div>
                </div>
                {showError ? (
                  <p className="error2">
                    {message ===
                    "Account already exists. Please verify your account" ? (
                      <>
                      {message}
                      {" or "}
                      <Link to={'/resend-email'} className="error2" style={{textDecoration:"underline"}}>resend verification email</Link>
                      </>
                    ) : (
                      message
                    )}
                  </p>
                ) : null}
                {isLoading ? (
                  <div className="btn-loading">
                    <HashLoader size={50} color="#FF6D18" loading={true} />
                  </div>
                ) : (
                  <div className="btn">
                    <Button
                      title="Sign up"
                      type="submit"
                      className="signup__btn"
                      onClick={() => setIsClicked(true)}
                    />
                  </div>
                )}
                <div className="line-text">
                  <p>or Sign up with</p>
                </div>
                <div>
                  <div className="google" onClick={authService.googleAuth}>
                    <FcGoogle className="google-icon" />
                    <p>Continue with google</p>
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
