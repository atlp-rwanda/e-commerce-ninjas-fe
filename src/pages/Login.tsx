/* eslint-disable */
import React from 'react'
import { Meta } from '../components/Meta'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BiSolidHide } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';

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
      <Meta title='Signup' />
      <div className='home-wrapper'>
        <div className='container'>
          <div className='login-form'>
            <form onSubmit={formik.handleSubmit}>
              <div className='left-side-login'>
                <div className='left-side-text'>
                  <h1>
                  Create e-commerceNinjas
                  account.
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
                  <p>Please create an account to continue</p>
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
                      placeholder='Password'
                      id='password'
                      name='password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? (<p className='error'>{formik.errors.password}</p>) : null}
                    <BiSolidHide className='hide' />
                  </div>
                </div>
                <div className='text-left'>
                  <Link to={'forgot-password'} className='forgot-password'>Forgot password</Link>
                </div>
                <div className='btn'>
                  <button type='submit'>Sign up</button>
                </div>
                <div className='line-text'>
                  <p>or Sign up with</p>
                </div>
                <div>
                  <div className='google'>
                    <FcGoogle className='google-icon' />
                    <p>Continue with google</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

