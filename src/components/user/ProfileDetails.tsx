/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store/store';
import { updateUserProfile, fetchUserProfile } from '../../store/features/user/userSlice';
import avatar from "../../../public/assets/avatar.jpg";
import camera from "../../../public/assets/Camera.png";
import Rwanda from "../../../public/assets/Rwanda_.png"
import { TailSpin } from 'react-loader-spinner';
import { toast } from "react-toastify";
import { changingProfile } from '../../store/features/auth/authSlice';

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

const ProfileDetails = ({ user, isSuccess, isError, message }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const [profileImage, setProfileImage] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileImage(user.profilePicture);
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      email: user?.email || "",
      profilePicture: user?.profilePicture || null,
      gender: user?.gender || "",
      birthDate: user?.birthDate || "",
      language: user?.language || "",
      currency: user?.currency || "",
    },

    enableReinitialize: true,
    validationSchema: updateProfileSchema,

    onSubmit: async (values) => {
      const initialValues = formik.initialValues;
      const hasChanged = Object.keys(values).some(
        key => values[key] !== initialValues[key]
      );

      if (!hasChanged) {
        toast.error("No fields have changed.");
        return;
      }

      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("profilePicture", values.profilePicture);
      formData.append("gender", values.gender);
      formData.append("currency", values.currency);
      formData.append("language", values.language);
      formData.append("birthDate", values.birthDate);

      setTimeout(()=>{
        setLoading(true)
      },2000)
      await dispatch(updateUserProfile(formData))
      .finally(()=>{
        setLoading(false)
      });

    }
  });


  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<any>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setProfileImage(e.target.result);
          dispatch(changingProfile(e.target.result))
        }
        formik.setFieldValue('profilePicture', file);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Invalid file type. Please select an image.');
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const renderError = (field) => {
    if (formik.touched[field] && typeof formik.errors[field] === 'string') {
      return <div>{formik.errors[field]}</div>;
    }
    return null;
  };

  return (
    <form className='profile-details' onSubmit={formik.handleSubmit}>
      <div className='title'>
        <h1>MY PROFILE DETAILS</h1>
        <button type='submit'>
          {loading ? (
            <div className="spinner-container">
              <TailSpin color="#ff6d18" width={20} />
            </div>
          ) : (
            "Save Changes"
          )}
        </button>
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
            <div>
              {user && <p>{user.email}</p>}
            </div>
          </div>
          <div className='select-layout'>
            <div id='country' >
              <img src={Rwanda} alt="Rwanda" />
            </div>
            <input type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {renderError('phone')}
          </div>
        </div>
        <div className='profile-pic' onClick={handleImageClick}>
          <div className='profile-image'>
            {profileImage ? (
              <img src={profileImage} width={400} height={400} />
            ) : (
              <img src={avatar} alt='upload profile' className='img' />
            )}
          </div>
          <div className='img-uploader'>
            <img src={camera} alt='edit profile' />
          </div>
          <input type="file" name="profilePicture" onChange={handleFileChange} ref={inputRef} style={{ display: 'none' }} />
          {renderError('profilePicture')}
        </div>
        <div className='right-side'>
          <div className='options'>
            <label htmlFor="gender">Gender</label>
            <select value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} name='gender' id='gender'>
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className='options'>
            <label htmlFor="currency">Currency</label>
            <select value={formik.values.currency} onChange={formik.handleChange} onBlur={formik.handleBlur} name='currency' id='currency'>
              <option value=""></option>
              <option value="USD">USD</option>
              <option value="RWF">RWF</option>
            </select>
          </div>
          <div className='options'>
            <label htmlFor="language">Language</label>
            <select value={formik.values.language} onChange={formik.handleChange} onBlur={formik.handleBlur} name='language' id='language'>
              <option value=""></option>
              <option value="English">English</option>
              <option value="Kinyarwanda">Kinyarwanda</option>
              <option value="Greek">Greek</option>
            </select>
          </div>
          <div className='input-d'>
            <label htmlFor="birthDate">Birth date</label>
            <input type="date" name="birthDate" value={formik.values.birthDate.split('T')[0]} onChange={formik.handleChange} onBlur={formik.handleBlur} pattern="\d{4}-\d{2}-\d{2}" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;
