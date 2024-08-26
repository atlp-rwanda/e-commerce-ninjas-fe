/* eslint-disable */
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  loginUser,
  verifyOTP,
  getUserDetails,
} from "../store/features/auth/authSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import authService from "../store/features/auth/authService";
import { joinRoom } from "../utils/socket/socket";
import { getToken, storeTokenWithExpiration } from "../utils/protectRoute/ProtectedRoute";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openOTPDialog, setOpenOTPDialog] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<any>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isLoading,
    isError,
    isSuccess,
    isAuthenticated,
    error,
    message,
    userId,
  } = useAppSelector((state) => state?.auth);
  const [user,setUser] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const { email } = values;
      localStorage.setItem("loggedEmail", email);
      await dispatch(loginUser(values)).then((res: any) => {
        setOtpError(null)
        toast.success(res.payload.message);
        storeTokenWithExpiration(res.payload.data.token)
      }).catch((err) => {
        console.error("Error fetching user details:", err);
      });
    },
  });
  useEffect(() => {
    const token = getToken();
    if (isSuccess && isAuthenticated) {
      dispatch(getUserDetails(token))
        .then((res) => {
          const userData = res.payload.data.user;
          setUser(userData);
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
        });
      formik.resetForm();
      
    }
  }, [isSuccess, isAuthenticated, dispatch]);
  
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'seller') {
        navigate('/seller/dashboard');
      } else if(user.role === 'buyer') {
        navigate( "/");
      }
      joinRoom();
    }
  }, [user]);
  
  
  function handleIsFocused() {
    setIsFocused(true);
    setIsClicked(false);
  }

  function handleIsVisible() {
    setIsVisible((isVisible) => !isVisible);
  }

  useEffect(() => {
    if (isSuccess && message === "Check your Email for OTP Confirmation") {
      setOpenOTPDialog(true);
    }
  }, [isSuccess, message]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setOtpLoading(true);
      setOtpError("");
      const res = await dispatch(verifyOTP({ userId, otp: otpString }));
      setOtpLoading(false);
    
      if ((res.type = "auth/verify-otp/rejected")) {
        setOtpError(res.payload);
        
      } else {
        setOtpError(null)
        setOpenOTPDialog(false);
      }
      setOtp(["", "", "", "", "", ""]);
    } else {
      setOtpError("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <section className="section__login">
      <div className="mini-container login">
        <div className="login__left">
          <p className="login__heading">
            Login to your account to access our platform
          </p>
          <p className="login__text">
            Simplify your e-commerce account with our user-friendly website.
          </p>
          <img
            src="../assets/images/loginPhoto.png"
            alt="login picture"
            className="login__img"
          />
        </div>
        <div className="login__right">
          <header className="login__header">
            <p className="login__heading">Welcome back</p>
            <p className="login__secondary">Please login to your account</p>
          </header>
          <form className="login__form form" onSubmit={formik.handleSubmit}>
            <div className="form__group">
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="form__input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => setIsClicked(false)}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form__group">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                className="form__input"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={handleIsFocused}
                onBlur={formik.handleBlur}
              />
              {isFocused ? (
                isVisible ? (
                  <BiSolidShow
                    className="form__icon"
                    onClick={handleIsVisible}
                  />
                ) : (
                  <BiSolidHide
                    className="form__icon"
                    onClick={handleIsVisible}
                  />
                )
              ) : (
                ""
              )}
              <p className="form__text">
                <Link to="/reset-password" className="form__link">
                  Forgot password
                </Link>
              </p>
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : isError && isClicked ? (
              <p className="error">{error}</p>
            ) : null}
            <button
              type="submit"
              className={`btn form__btn${isLoading ? " loading" : ""}`}
              disabled={isLoading}
              onClick={() => setIsClicked(true)}
            >
              <span>{isLoading ? "Loading " : "Login"}</span>
              <PulseLoader size={6} color="#ffe2d1" loading={isLoading} />
            </button>
          </form>
          <p className="login__separator">or Login with</p>
          <div className="login__box" onClick={authService.googleAuth}>
            <FcGoogle className="login__social__icon" />
            <p className="login__social__text">Login with google</p>
          </div>
          <p className="login__register">
            New to e-commerce Ninjas?
            <Link to="/signup" className="login__link">
              Register
            </Link>
          </p>
        </div>
      </div>

      <Dialog
        open={openOTPDialog}
        onClose={() => setOpenOTPDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: "24px",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "2rem", fontWeight: "bold", color: "#ff6d18" }}
        >
          Verify OTP
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "1.2rem", marginBottom: "20px" }}
          >
            Please enter the 6-digit OTP sent to your email to verify your
            account.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            {otp?.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.5rem" },
                }}
                sx={{
                  width: "40px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ff6d18",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e65b00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#e65b00",
                    },
                  },
                }}
              />
            ))}
          </Box>
          {otpError && (
            <DialogContentText
              id="alert-dialog-error"
              sx={{
                fontSize: "1.2rem",
                marginBottom: "20px",
                color: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {typeof(otpError) === "string" ? otpError : null}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: "16px" }}>
          <Button
            onClick={() => {
              setOpenOTPDialog(false);
              setOtp(["", "", "", "", "", ""]);
              setOtpError("");
            }}
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontSize: "1.2rem",
              padding: "8px 24px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleVerifyOTP}
            sx={{
              backgroundColor: "#ff6d18",
              color: "#fff",
              fontSize: "1.2rem",
              padding: "8px 24px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#e65b00",
              },
            }}
            autoFocus
          >
            {otpLoading ? "Verifying" : "Verify"}
            <PulseLoader size={6} color="#ffe2d1" loading={otpLoading} />
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default Login;
