/* eslint-disable */
import React, { useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../store/store';
import ProfileDetails from '../components/user/ProfileDetails';
import PasswordUpdate from '../components/user/PasswordUpdate';
import ShippingAddress from '../components/user/ShippingAddress';
import { ILocation } from '../utils/types/store';
import SubmitSellerRequest from '../components/user/SubmitSellerRequest';
import { toast } from 'react-toastify';
import { resetUser } from '../store/features/user/userSlice';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector((state) => state.user);
  const [location, setLocation] = useState<ILocation | null>(null);

  useEffect(()=>{
    dispatch(resetUser())
    if(isSuccess){
        toast.success(message)
    }
    else if(isError){
        toast.error(message)
    }
  },[isSuccess, isError, message])
  
  return (
    <>
      <section className='profile-container'>
        <ProfileDetails user={user} isSuccess={isSuccess} isError={isError} message={message} />
        <PasswordUpdate message={message} isSuccess={isSuccess} isError={isError}/>
        <ShippingAddress user={user} isSuccess={isSuccess} isError={isError} message={message} setLocation={setLocation} />
        <div className="seller__request">
          <SubmitSellerRequest
          />
        </div>
      </section>
    </>

  )
}



export default UserProfile