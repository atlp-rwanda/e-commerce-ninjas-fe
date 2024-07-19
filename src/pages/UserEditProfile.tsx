/* eslint-disable */
import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
import { toast } from "react-toastify";

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


const UserProfile: React.FC<RwandaLocationSelectorProps> = ({setLocation}) => {
  const dispatch = useAppDispatch();
  const { user, isSuccess, isError, isLoading, message } = useAppSelector((state) => state.user);
  const inputRef = useRef(null) 
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    profilePicture: null,
    gender: "",
    birthDate: "",
    language: "",
    currency: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [country, setCountry] = useState('Rwanda');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [sector, setSector] = useState('');
    const [profileImage, setProfileImage] = useState<File | string>('../../public/assets/ProfileImage.jpg');
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>('../public/assets/ProfileImage.jpg');

    const handleImageClick = ()=>{
      inputRef.current.click()
    }

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setProvince(e.target.value);
      setDistrict('');
      setSector('');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDistrict(e.target.value);
      setSector('');
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSector(e.target.value);
  };

  const getOptions = (selectedData: NestedObject) => {
    return Object.keys(selectedData).map(key => <option key={key} value={key}>{key}</option>);
};

useEffect(() => {
    setLocation && setLocation({ country, province, district, sector });
}, [country, province, district, sector, setLocation]);


  const newPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setInitialValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        profilePicture: user.profilePicture || null,
        gender: user.gender || "",
        birthDate: user.birthDate || "",
        language: user.language || "",
        currency: user.currency || "",
      });
      setProfileImage(user.profilePicture || 'ProfileImage.jpg');
    }
  }, [user]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
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
    const file = event.currentTarget.files[0];
    setProfilePictureUrl(URL.createObjectURL(file));
    formik.setFieldValue('profilePicture', file);

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

  const formikPwd = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        formik.setStatus("Passwords do not match");
      }
      else {
        const token = localStorage.getItem("token");
        dispatch(updatePassword({ token, password: values.password }));

      }
    },
  })

  useEffect(() => {
    if (isError) {
      formik.setStatus(message);
    }
    if (isSuccess) {
      toast.success(message)

    }
  }, [user, isError, isSuccess, isLoading, message])

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
                <label>Email Address</label>
                {/* <div>{user.email}</div> */}
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
            <div className='profile-pic' onClick={handleImageClick}>
              <img src={profilePictureUrl}/>              
              <img src={camera} alt='edit profile' />
              <input type="file" name="profilePicture" onChange={handleFileChange} ref={inputRef} style={{ display: 'none' }}/>
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
                <input type="date" name="birthDate" value={formik.values.birthDate.split('T')[0]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {renderError('birthDate')}
              </div>
            </div>
          </div>
        </form>
        <form className="password-container" onSubmit={formikPwd.handleSubmit}>
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
                    type={showPassword ? 'text' : 'password'}
                    className="input-field1"
                    placeholder=" "
                    name='password'
                    id="newPassword"
                    required
                    value={formikPwd.values.password}
                    onChange={formikPwd.handleChange}
                    onBlur={formikPwd.handleBlur}
                  />
                  <button
                type="button"
                className="toggle-password"
                onClick={newPasswordVisibility}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
                </div>
              </div>
            </div>
            <div>
              <div className="password-inp">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-n">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="input-field2"
                    placeholder=" "
                    name='confirmPassword'
                    value={formikPwd.values.confirmPassword}
                    onChange={formikPwd.handleChange}
                    onBlur={formikPwd.handleBlur}
                    id="confirmPassword"
                    required
                  />
                  <button
                type="button"
                className="toggle-password"
                onClick={confirmPasswordVisibility}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="shipping-address">
                    <div className='title'>
                        <h1>MY SHIPPING ADDRESS</h1>
                        <button>Save Change</button>
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
                </div>
      </section>
    </>

  )
}


export default UserProfile