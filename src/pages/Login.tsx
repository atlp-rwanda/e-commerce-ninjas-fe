/* eslint-disable */
import React from 'react'
import { Meta } from '../components/Meta'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BiSolidHide } from "react-icons/bi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <>
      <Meta title='Login' />
      <div className='home-wrapper'>
        <div className='container'>
          <div className='login-form'>
            <form onSubmit={formik.handleSubmit}>
              <div className='left-side-login'>
                <div className='left-side-text'>
                  <h1>
                    Create e-commerceNinjas account.
                  </h1>
                  <p>
                    Simplify your e-commerce account with our
                    user-friendly website.
                  </p>
                </div>
                <div className='img'>
                  <img src="images/login-icon.png" alt="login-icon" />
                </div>
              </div>
              <div className='right-side-login'>
                <div className='right-side-text'>
                  <h1>Create an account</h1>
                  <p>Please login to your account</p>
                </div>
                <div className='form-box'>
                  <div className='input-box'>
                    <input
                      type="text"
                      placeholder='Email'
                      id='email'
                      name='email'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? (<p className='error'>{formik.errors.email}</p>) : null}
                  </div>
                  <div className='input-box'>
                    <input
                      type="password"
                      placeholder='password'
                      id='password'
                      name='password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? (<p className='error'>{formik.errors.password}</p>) : null}
                    <BiSolidHide />
                  </div>
                </div>
                <div className='text-left'>
                  <p>Forgot password</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

