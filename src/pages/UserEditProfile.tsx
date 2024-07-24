/* eslint-disable */
import React, { useState} from 'react'
import { useAppSelector } from '../store/store';
import ProfileDetails from '../components/user/ProfileDetails';
import PasswordUpdate from '../components/user/PasswordUpdate';
import ShippingAddress from '../components/user/ShippingAddress';
import { ILocation } from '../utils/types/store';
import SubmitSellerRequest from '../components/user/SubmitSellerRequest';

const UserProfile = () => {
  const { user, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.user);
  const [location, setLocation] = useState<ILocation | null>(null);

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
        <ProfileDetails user={user} isLoading={isLoading} isSuccess={isSuccess} isError={isError} message={message} />
        <PasswordUpdate message={message} isLoading={isLoading} isSuccess={isSuccess} isError={isError}/>
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