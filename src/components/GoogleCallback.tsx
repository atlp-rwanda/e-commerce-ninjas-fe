/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { googleAuthCallback } from '../store/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import "../../src/styles/Loader.scss";

const GoogleCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');
    const authuser = urlParams.get('authuser');
    const prompt = urlParams.get('prompt');

    const authenticate = async () => {
      try {
        if (code && scope) {
          const response = await dispatch(
            googleAuthCallback({ code, scope, authuser, prompt })
          );
          const token = response.payload.data.token;
          localStorage.setItem('token', token);
          navigate('/');
        } else {
          console.error('Missing authentication parameters');
          setError('Missing authentication parameters');
        }
      } catch (error) {
        console.error('Authentication failed', error);
        setError('Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="loader">
        <PuffLoader color="#ff6d18" size={300} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return <div>Authenticating....</div>;
};

export default GoogleCallback;
