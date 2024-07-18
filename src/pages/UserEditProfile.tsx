/* eslint-disable */
import React, { useEffect } from 'react'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { updatePassword, fetchUserProfile, updateUserProfile } from '../store/features/user/userSlice';
import { IProfile, ILocation, IEmail } from '../utils/types/store';
import profileImage from "../../public/assets/ProfileImage.jpg"
import camera from "../../public/assets/Camera.png"
import { TailSpin } from 'react-loader-spinner'
import data from '../components/locations/location';
import * as Yup from "yup"
import { useFormik } from "formik";
import { toast } from "react-toastify"

const updateProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    profilePicture: Yup.mixed().required('A file is required'),
    gender: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required').nullable(),
    language: Yup.string().required('Required'),
    currency: Yup.string().required('Required'),
});

const passwordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/(?=.*\d)/, 'Password must contain at least one number')
        .matches(/(?=.*[\W_])/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')
});


interface RwandaLocationSelectorProps {
    setLocation?: React.Dispatch<React.SetStateAction<ILocation | null>>;
}

type RwandaData = {
    [key: string]: {
        [key: string]: {
            [key: string]: {
                [key: string]: {
                    [key: string]: string[];
                };
            };
        };
    };
};

type NestedObject = {
    [key: string]: NestedObject | string[];
};

const rwandaData: RwandaData = data;


const UserProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isSuccess, isError, isLoading, message } = useAppSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            profilePicture: null,
            gender: "",
            birthDate: "",
            language: "",
            currency: "",
        },
        validationSchema: updateProfileSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("phone", values.phone);
            formData.append("profilePicture", values.profilePicture);
            formData.append("gender", values.gender);
            formData.append("currency", values.currency);
            formData.append("language", values.language);
            formData.append("birthDate", values.birthDate);

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            dispatch(updateUserProfile(formData));
        },
    });

    const handleFileChange = (event) => {
        formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
    };

    useEffect(() => {
        if (isSuccess) {
            alert("Success");
        }
    }, [isSuccess]);
    const renderError = (field) => {
        if (formik.touched[field] && typeof formik.errors[field] === 'string') {
          return <div>{formik.errors[field]}</div>;
        }
        return null;
      };
    
      return (
        <>
        <section className='profile-container'>
          <form className='profile-details' onSubmit={formik.handleSubmit}>
            <div className='title'>
              <h1>MY PROFILE DETAILS</h1>
              <button type='submit'>Save Changes</button>
            </div>
            <div className='details'>
              <div className='input-container'>
                <div className='input-layout'>
                  <label htmlFor='firstName'>First Name</label>
                  <input type='text' name='firstName' value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {renderError('firstName')}
                </div>
                <div className='input-layout'>
                  <label htmlFor='lastName'>Last Name</label>
                  <input type='text' name='lastName' value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {renderError('lastName')}
                </div>
                <div className='input-layout'>
                  <label htmlFor='email'>Email Address</label>
                  {/* <div>{data.email}</div> */}
                </div>
                <div className='select-layout'>
                  <select id='country' name='country'>
                    <option value="value1">Rwanda</option>
                    <option value="">Uganda</option>
                    <option value="">Burundi</option>
                    <option value="">Kenya</option>
                  </select>
                  <input type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {renderError('phone')}
                </div>
              </div>
              <div className='profile-pic'>
                <img src={profileImage} alt="profile" />
                <img src={camera} alt='edit profile' />
                <input type="file" name="profilePicture" onChange={handleFileChange} />
                {renderError('profilePicture')}
              </div>
              <div className='right-side'>
                <div className='options'>
                  <label htmlFor="gender">Gender</label>
                  <select value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} name='gender' id='gender'>
                    <option value="male" selected>Male</option>
                    <option value="female">Female</option>
                  </select>
                  {renderError('gender')}
                </div>
                <div className='options'>
                  <label htmlFor="currency">Currency</label>
                  <select value={formik.values.currency} onChange={formik.handleChange} onBlur={formik.handleBlur} name='currency' id='currency'>
                    <option value="USD" selected>USD</option>
                    <option value="RWF">RWF</option>
                  </select>
                  {renderError('currency')}
                </div>
                <div className='options'>
                  <label htmlFor="language">Language</label>
                  <select value={formik.values.language} onChange={formik.handleChange} onBlur={formik.handleBlur} name='language' id='language'>
                    <option value="English" selected>English</option>
                    <option value="Kinyarwanda">Kinyarwanda</option>
                    <option value="Greek">Greek</option>
                  </select>
                  {renderError('language')}
                </div>
                <div className='input-d'>
                  <label htmlFor="birthDate">Birth date</label>
                  <input type="date" name="birthDate" value={formik.values.birthDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                  {renderError('birthDate')}
                </div>
              </div>
            </div>
          </form>
            <form className="password-container" onSubmit={formik.handleSubmit}>
                <div className="title">
                    <h1>MY PASSWORD</h1>
                    <button type="submit">Save Change</button>
                </div>
                <div className="password">
                    <div>
                        <div className="password-inp">
                            <label htmlFor="password">Password</label>
                            <div className="input-n">
                                <input
                                    type="password"
                                    name="password"
                                    value=""
                                    onChange={formik.handleChange}
                                />
                                {/* <span onClick={() => setPasswordVisible(!passwordVisible)}>
                                        {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
                                    </span> */}
                            </div>
                            {/* {formik.touched.password && formik.errors.password ? (
                                    <p className="error">{formik.errors.password}</p>
                                ) : null} */}
                        </div>
                    </div>
                    <div>
                        <div className="password-inp">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-n">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    // value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                                {/* <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                        {confirmPasswordVisible ? <IoMdEyeOff /> : <IoMdEye />}
                                    </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* <div className="shipping-address">
                    <div className='title'>
                        <h1>MY SHIPPING ADDRESS</h1>
                        <button onSubmit={handleSubmit}>Save Change</button>
                    </div>
                    <div className="shipping">
                        <div >
                            <div className='select-inp'>
                                <label htmlFor="Province">Province</label>
                                <select value={province} onChange={handleProvinceChange} disabled={!country}>
                                    <option value="">Select Province</option>
                                    {country && getOptions(rwandaData[country])}
                                </select>
                            </div>
                            <div className='select-inp'>
                                <label htmlFor="District">District</label>
                                <select value={district} onChange={handleDistrictChange} disabled={!province}>
                                    <option value="">Select District</option>
                                    {province && getOptions(rwandaData[country][province])}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className='select-inp'>
                                <label htmlFor="Sector">Sector</label>
                                <select value={sector} onChange={handleSectorChange} disabled={!district}>
                                    <option value="">Select Sector</option>
                                    {district && getOptions(rwandaData[country][province][district])}
                                </select>
                            </div>
                            <div className='select-inp'>
                                <label htmlFor="Street-address">Street Address:</label>
                                <select >
                                    <option value="" disabled></option>
                                    <option >KN 123</option>
                                    <option >KN 301</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div> */}
        </section>
        </>

    )
}


export default UserProfile
