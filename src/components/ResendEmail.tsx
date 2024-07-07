/* eslint-disable */
import React, { useEffect } from "react";
import { Meta } from "./Meta";
import Button from "./buttons/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resendVerificationEmail } from "../store/features/auth/authSlice";
import { PuffLoader } from "react-spinners";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
})
export const ResendEmail = () => {
  const dispatch = useAppDispatch();
  const { isSuccess, isError, isLoading, message } = useAppSelector((state) => state.auth)
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(resendVerificationEmail(values));
    },
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      formik.resetForm()
    }
    if (isError) {
      toast.error(message)
    }
  })
  return (
    <>
      <Meta title="Resend Email - E-Commerce Ninjas" />
      <div className="wrapper">
        <div className="container">
          {
            isLoading ? (
              <div className="loading-spinner">
                <PuffLoader size={100} color="#FF6D18" loading={isLoading} />
                <p>Please wait...</p>
              </div>
            ) : (
              <div className="resend-email">
                <h2>Resend Email</h2>
                <p>Please enter your email address below to resend the verification email.</p>
                <form onSubmit={formik.handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <Button title="Resend" type="submit" />
                </form>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}
