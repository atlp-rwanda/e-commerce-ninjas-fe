/* eslint-disable */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { getUserDetails } from "../store/features/auth/authSlice";

function useSellerAuthCheck() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { pathname } = location;
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const callbackUrl = useMemo(() => encodeURIComponent(pathname), [pathname]);
    const token = localStorage.getItem('token')

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
            if (!isAuthenticated || !token || !user || (user as any).role !== "seller") {
                const message = !isAuthenticated ? 'You must login first' : 'You must login as a seller';
                toast.info(message);
                navigate(`/seller/login?callbackUrl=${callbackUrl}`);
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [isChecking, isAuthenticated, user, navigate, callbackUrl]);

    return isAuthorized;
}

export default useSellerAuthCheck;
