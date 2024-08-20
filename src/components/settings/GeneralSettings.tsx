/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  fetchPasswordExpiration,
  updateUserPasswordExpiration,
} from "../../store/features/admin/adminSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Bars } from "react-loader-spinner";
import { LinearProgress } from "@mui/material";

export const GeneralSettings = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading, passwordExpiration } = useAppSelector(
    (state) => state?.admin
  );
  const [minutes, setMinutes] = useState(passwordExpiration);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    dispatch(fetchPasswordExpiration());
    setMinutes(passwordExpiration);
  }, [dispatch, passwordExpiration]);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(Number(e.target.value));
  };

  const handleSavePasswordExpiration = () => {
    if (minutes) {
      dispatch(updateUserPasswordExpiration({ minutes }));
    }
    setIsDisabled(true);
    setIsEdit(true);
  };

  return (
    <>
        <div className="section-content">
        {isLoading && (
          <div className="table__spinner">
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                sx={{
                  backgroundColor: "#fff",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#ff8a46",
                  },
                }}
              />
            </Box>
          </div>
        )}
          <div className="password_exp">
            <div className="form-group">
              <label htmlFor="password">Password Expiration Time</label>
              <input
                type="text"
                id="password"
                value={minutes}
                onChange={handleMinutesChange}
                disabled={isDisabled}
                onFocus={() => setIsEdit(false)}
                placeholder="Enter password expiration period in minutes"
              />
            </div>
            {isEdit ? (
              <button
                className="btn"
                onClick={() => setIsDisabled(!isDisabled)}
              >
                Edit
              </button>
            ) : (
              <button className="btn" onClick={handleSavePasswordExpiration}>
                Save
              </button>
            )}
          </div>
        </div>
    </>
  );
};
