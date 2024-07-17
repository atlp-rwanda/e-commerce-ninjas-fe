/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Meta } from "../components/Meta";
import { useAppDispatch, useAppSelector } from "../store/store";
import { verifyEmail } from "../store/features/auth/authSlice";
import { DotLoader } from "react-spinners";
import email from "../../public/assets/images/email.png"
import failed from "../../public/assets/images/failed.png";
import { toast } from "react-toastify";
const VerifyEmail: React.FC = () => {
    const { token } = useParams<{ token: string }>() as any;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isSuccess, isError, message, isLoading } = useAppSelector((state) => state.auth)
    useEffect(() => {
        dispatch(verifyEmail(token));
    }, [token, navigate]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(message);
        }
        else if (isError) {
            toast.error(message);
        }
    }, [isSuccess, isError, navigate]
    );
    return (
        <>
            <Meta title="verify email - E-Commerce Ninjas" />
            <div className="wrapper">
                <div className="container">
                    <div className="verify-email-page">
                        {
                            isLoading ? (
                                <div className="isLoading">
                                    <div className="spinner-wrapper">
                                        <DotLoader size={100} color='#FF6D18' loading={isLoading} />
                                    </div>
                                    <h2>Verifying your email...</h2>
                                    <p>Please wait...</p>
                                </div>
                            ) : isSuccess ? (
                                <div className="isSuccess">
                                    <img src={email} alt="" />
                                    <p>Thank you for verifying your email.<span onClick={() => navigate("/login")}>Go to login</span></p>
                                </div>
                            ) : isError ? (
                                <div className="isError">
                                    <img src={failed} alt="" />
                                    <p className="error2">There was an error in verifying your email</p>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>

    );
};

export default VerifyEmail;
