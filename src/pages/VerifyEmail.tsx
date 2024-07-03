/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Meta } from "../components/Meta";
import { useAppDispatch, useAppSelector } from "../store/store";
import { verifyEmail } from "../store/features/auth/authSlice";
import { DotLoader } from "react-spinners";

const VerifyEmail: React.FC = () => {
    const { token } = useParams<{ token: string }>() as any;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isVerified, isError, message, isLoading } = useAppSelector((state) => state.auth)
    useEffect(() => {
        console.log("token", token);
        dispatch(verifyEmail(token));
    }, [token, navigate]);

    useEffect(() => {
        if (isVerified) {
            navigate('/login')
            alert(message); // TODO: Toast to show message when user is verified
        }
        else if (isError) {
            if (message === "Account already verified.") {
                navigate('/login')
                 alert(message); // TODO: Toast to show message when user is already verified
            }
            if (message === "Account not found.") {
                navigate('/signup')
            }
            navigate('/*')
        }
    }, [isVerified, isError, navigate]
    );
    return (
        <>
            <Meta title="verify email - E-Commerce Ninjas" />
            <div className="wrapper">
                <div className="container">
                    <div className="verify-email-page">
                        <div className="spinner-wrapper">
                            <DotLoader size={100} color='#FF6D18' loading={isLoading} />
                        </div>
                        <h2>Verifying your email...</h2>
                        <p>Please wait...</p>
                    </div>
                </div>
            </div>
        </>

    );
};

export default VerifyEmail;
