/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetAuth, sendResetLink } from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
});

const SendResetPasswordLink: React.FC = () => {
  const [hideParagraph, setHideParagraph] = useState(true);
  const dispatch = useAppDispatch();
  const { user, fail, isSuccess, isLoading, message } = useAppSelector(
    (state) => state?.auth
  );
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      dispatch(sendResetLink(values.email))
    }
  });

  useEffect(() => {
    if (fail) {
      formik.setStatus(message);
    }
    if (isSuccess) {
      toast.success(message);
      formik.resetForm();
      setHideParagraph(false);
    }
  }, [fail, isSuccess, message]);
  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  return (
    <>
      <br />
      <br />

      <main>
        <div className="resetPassword-Container">
          <h1>Get Reset Password Link</h1>

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
              <label className="input-label" id="email" htmlFor="email">
                Email Address
              </label>
            </div>
            {fail? (<p className="error">{formik.status}</p>):null}
            <br />
            <button
              className={`reset-Button${isLoading ? " loading" : ""}`}
              disabled={isLoading}
            >
              <span>{isLoading ? "Loading " : "Get Reset Link"}</span>
              <PulseLoader size={6} color="#ffe2d1" loading={isLoading} />
            </button>
          </form>
        </div>
        <br />
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

export default SendResetPasswordLink;
