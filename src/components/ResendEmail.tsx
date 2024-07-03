/* eslint-disable */
import React from "react";
import { Meta } from "./Meta";
import Button from "./buttons/Button";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
})
export const ResendEmail = () => {
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  })
  return (
    <>
      <Meta title="Resend Email - E-Commerce Ninjas" />
      <div className="wrapper">
        <div className="container">
          <div className="resend-email">
            <h2>Resend Email</h2>
            <p>Please enter your email address below to resend the verification email.</p>
            <form>
              <input 
              type="email" 
              placeholder="Email Address" 
              required 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.email}
              />
              <Button title="Resend" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
