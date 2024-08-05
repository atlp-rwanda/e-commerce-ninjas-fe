/* eslint-disable */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getUserDetails } from "../store/features/auth/authSlice";

function useAdminAuthCheck() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { pathname } = location;
    const { user, isAuthenticated, token } = useAppSelector((state) => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const checkAuth = useCallback(async () => {
        if (token) {
            await dispatch(getUserDetails(token));
        }
        setIsChecking(false);
    }, [dispatch, token]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isChecking) {
            if (!isAuthenticated || !user || (user as any).role !== "admin") {
                const message = !isAuthenticated ? 'You must login first' : 'You must login as an admin';
                // toast.info(message);
                navigate(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [isChecking, isAuthenticated, user, navigate, pathname]);

    return isAuthorized;
}

export default useAdminAuthCheck;