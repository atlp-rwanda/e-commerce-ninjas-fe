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

    const checkAuth = useCallback(async () => {
            await dispatch(getUserDetails());
        setIsChecking(false);
    }, [dispatch, ]);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!isChecking) {
            if (!isAuthenticated || !user || (user as any).role !== "seller") {
                const message = !isAuthenticated ? 'You must login first' : 'You must login as a seller';
                // toast.info(message);
                window.location.href =`/login?callbackUrl=${callbackUrl}`;
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [isChecking, isAuthenticated, user, navigate, callbackUrl]);

    return isAuthorized;
}

export default useSellerAuthCheck;
