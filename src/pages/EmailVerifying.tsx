/* eslint-disable */
import React, { useEffect } from 'react'
import { Meta } from '../components/Meta'
import { useNavigate } from 'react-router-dom';
import newMessage from "../../public/assets/images/new-message.png"
import { useAppSelector } from '../store/store'
export const EmailVerifying = () => {
    const navigate = useNavigate();
    const {isVerified} = useAppSelector((state) => state.auth)
    useEffect(() => {
        if (isVerified) {
            navigate("/")
        }
    },[navigate])
    return (
        <>
            <Meta title='Email Verifying - E-Commerce Ninjas' />
            <div className='wrapper'>
                <div className="container">
                    <div className="email-spot">
                        <div className="text-header">
                            <h1>Email Verification</h1>
                            <p>We've sent a verification email to your registered email address. Please check your inbox to activate your account.</p>
                            <p>If you didn't receive the email, please make sure to check your spam folder. If it's still not there, please try resending the verification email.</p>
                        </div>
                        <div className='img-message'>
                            <img src={newMessage} alt="message" />
                        </div>
                        <div>
                            <span onClick={(()=> navigate("/resend-email"))} className="btn-link">Resend email</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
