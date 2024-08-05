/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { PulseLoader } from "react-spinners";
import { resetAuth, resetPassword } from "../store/features/auth/authSlice";
import { useFormik } from "formik";
import passwordChanged from "../../public/assets/images/resetPassword.png";
import { toast } from "react-toastify";

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
  const { user, fail, isSuccess, isLoading, message } = useAppSelector(
    (state) => state?.auth
  );
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        setShowError(true);
        formik.setStatus("Passwords do not match");
      } else {
        const pathParts = location.pathname.split("/");
        const token = pathParts[pathParts.length - 1];
        dispatch(resetPassword({ token, password: values.password }));
      }
    },
  });
  useEffect(() => {
    if (fail) {
      formik.setStatus(message);
    }
    if (isSuccess) {
      toast.success(message);
      setIsFormVisible(false);
    }
  }, [user, fail, isSuccess, isLoading, message]);
  
  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);
  return (
    <>
      <main>
        {isFormVisible ? (
          <form className="resetPasswordForm" onSubmit={formik.handleSubmit}>
            <h1>Reset password</h1>
            <div className="input-containers">
              <div className="input-container1">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="input-field1"
                  placeholder=" "
                  name="password"
                  id="newPassword"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="input-label1" htmlFor="newPassword">
                  New password
                </label>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={newPasswordVisibility}>
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              <br />
              <div className="input-container2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input-field2"
                  placeholder=" "
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="confirmPassword"
                  required
                />
                <label className="input-label2" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={confirmPasswordVisibility}>
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              <div>
                {showError || fail ? (
                  <p className="error">{formik.status}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className={`reset-Button${isLoading ? " loading" : ""}`}
                disabled={isLoading}>
                <span>{isLoading ? "Loading" : "Reset Password"}</span>
                <PulseLoader size={6} color="#ffe2d1" loading={isLoading} />
              </button>
            </div>
          </form>
        ) : (
          <div className="redirect-page">
            <div className="success-page">
              <div className="isSuccess">
                <img src={passwordChanged} alt="" />
                <p>
                  <h2>Password is changed</h2>
                  <span onClick={() => navigate("/login")}>
                    Continue to login
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
export default ResetPassword;
