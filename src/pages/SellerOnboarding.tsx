/* eslint-disable */
import React, { useEffect } from "react";
import VerticalStepper from "../components/vertical stepper/VerticalStepper";
import { useAppSelector,useAppDispatch } from "../store/store";
import { resetAuth } from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { resetUser } from "../store/features/user/userSlice";
export const SellerOnboarding = () => {
    const dispatch = useAppDispatch();
    const {isSuccess,isError,message} = useAppSelector((state) => state.user)
    useEffect(() => {
        dispatch(resetAuth)
        dispatch(resetUser())
        if(isSuccess){
            toast.success(message)
        }
        if(isError){
            toast.error(message)
        }
    },[dispatch,isSuccess,isError,message])
  return (
    <div className="become-seller-container">
       <VerticalStepper />
    </div>
  )
}
