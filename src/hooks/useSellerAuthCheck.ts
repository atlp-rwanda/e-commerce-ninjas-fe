/* eslint-disable */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { getUserDetails } from "../store/features/auth/authSlice";
import { getToken } from "../utils/protectRoute/ProtectedRoute";

function useSellerAuthCheck() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { pathname } = location;
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const callbackUrl = useMemo(() => encodeURIComponent(pathname), [pathname]);
    const token = getToken();

    const checkAuth = useCallback(async () => {
        if (token) {
            await dispatch(getUserDetails(token));
        }
        setIsChecking(false);
    }, [dispatch, token]);

    useEffect(() => {
        console.log("Checking authentication...");
        checkAuth();
    }, [checkAuth]);
    
    useEffect(() => {
        console.log("Authorization check - isChecking:", isChecking);
        console.log("Authorization check - isAuthenticated:", isAuthenticated);
        if (!isChecking) {
            if (!isAuthenticated || !token || !user || (user as any).role !== "seller") {
                console.log("Redirecting to login...");
                navigate(`/login?callbackUrl=${callbackUrl}`);
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        }
    }, [isChecking, isAuthenticated, user, navigate, callbackUrl, token]);
    

    return isAuthorized;
}

export default useSellerAuthCheck;
