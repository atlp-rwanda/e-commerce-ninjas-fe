/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import { userSubmitSellerRequest } from '../../store/features/user/userSlice';
import seller from "../../../public/assets/sellerI.png"

const SubmitSellerRequest= ({
  user,
  isError,
  isSuccess,
  message
}) => {
  const dispatch = useAppDispatch();


  const handleClick = async () => {

        if (user) {
            try {
              await dispatch(userSubmitSellerRequest(user));
            } catch (error) {
              toast.error(isError);
            }
          } else {
            toast.error('Please ensure all required fields are filled.');
          }
    
    }
  useEffect(()=>{
    if(isSuccess){
        toast.success(message)
    }
    else if(isError){
        toast.error(message)
    }
  },[isSuccess, isError, message])

  return (
    <button onClick={handleClick}>
      <img src={seller} alt='seller request'/>
    </button>
  );
};

export default SubmitSellerRequest;
