/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { googleAuthCallback } from '../store/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { resetAuth } from '../store/features/auth/authSlice';

const GoogleCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess,isAuthenticated , isError, message ,token} = useAppSelector((state) => state.auth);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const scope = urlParams.get('scope');
  const authuser = urlParams.get('authuser');
  const prompt = urlParams.get('prompt');


  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);
  useEffect(() => {
    if (code && scope && authuser && prompt) {
      dispatch(googleAuthCallback({ code, scope, authuser, prompt }));
    } else {
      toast.error('Invalid authentication parameters.');
      navigate("/login");
    }
  }, [code, scope, authuser, prompt, dispatch]);

  useEffect(() => {
    if (isSuccess && isAuthenticated) {
      navigate("/home");
    }
    if (isError) {
      navigate("/login");
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <div className="google-callback" style={{height:"100vh" , width:"100vw"}}>
      {isLoading && (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column', height:"90vh", gap:"2rem"}}>
          <div className="btn-loading">
            <HashLoader size={150} color="#FF6D18" loading={true} />
          </div>
          <div style={{fontSize:"1.8rem",fontWeight:'bold'}}>Authenticating....</div>
        </div>
      )}
    </div>
  );
};

export default GoogleCallback;

