/* eslint-disable */
import React, { useEffect } from 'react'
import { Meta } from '../components/Meta'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
export const EmailVerifying = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        },6000)
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
                            <img src="images/new-message.png" alt="" />
                        </div>
                        <div>
                            <Link to="resend-email" className="btn-link">Resend email</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
