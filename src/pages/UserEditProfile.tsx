/* eslint-disable */
import React, { useState, useEffect} from 'react'
import { useAppSelector } from '../store/store';
import ProfileDetails from '../components/user/ProfileDetails';
import PasswordUpdate from '../components/user/PasswordUpdate';
import ShippingAddress from '../components/user/ShippingAddress';
import { ILocation } from '../utils/types/store';
import SubmitSellerRequest from '../components/user/SubmitSellerRequest';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.user);
  const [location, setLocation] = useState<ILocation | null>(null);

  useEffect(()=>{
    if(isSuccess){
        toast.success(message)
    }
    else if(isError){
        toast.error(message)
    }
  },[isSuccess, isError, message])

  const requestData = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    gender: user?.gender,
    birthDate: user?.birthDate,
    language: user?.language,
    currecy: user?.currency
  };

  
  return (
    <>
      <section className='profile-container'>
        <ProfileDetails user={user} isSuccess={isSuccess} isLoading={isLoading} isError={isError} message={message} />
        <PasswordUpdate message={message} isSuccess={isSuccess} isError={isError}/>
        <ShippingAddress user={user} isLoading={isLoading} isSuccess={isSuccess} isError={isError} message={message} setLocation={setLocation} />
        <div className="seller__request">
          <SubmitSellerRequest
            user={requestData}
            isSuccess= {isSuccess}
            message={message}
            isError={isError}
          />
        </div>
      </section>
    </>

  )
}



export default UserProfile