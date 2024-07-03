/* eslint-disable */
import React, { useEffect } from 'react'
import { useAppDispatch,useAppSelector } from '../store/store';
import { googleAuthCallback } from '../store/features/auth/authSlice';
const GoogleCallback = () => {
  const dispatch = useAppDispatch();
  // Add Google OAuth callback logic here
  // Redirect to home page upon successful authentication
  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const scope = urlParams.get('scope');
      const authuser = urlParams.get('authuser');
      const prompt = urlParams.get('prompt');
    console.log(code && scope)
    if (code && scope) {
      dispatch(googleAuthCallback({code,scope,authuser,prompt}));
    }
  },[dispatch])
  return (
    <div>Google</div>
  )
}

export default GoogleCallback