/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllTerms } from "../../store/features/admin/adminSlice";
interface TermsProps {
  onNext: (data: { terms: boolean }) => void;
}
const TermsAndConditionsForm: React.FC<TermsProps> = ({ onNext }) => {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { terms } = useAppSelector((state) => state.admin);
  const [term, setTerm] = useState<any>();
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    onNext({ terms: agreed });
  }, [agreed, onNext]);
  useEffect(() => {
    dispatch(getAllTerms());
  }, [dispatch]);

  useEffect(() => {
    if (terms && user) {
      const userTerms = terms.find(
        (term) => term.type === "buyer" && user.role === "buyer"
      );
      if (userTerms) {
        setTerm(userTerms);
      }
    }
  }, [user, terms]);
  
  console.log(term);
  return (
    <Box>
      {term ? (
        <FormControlLabel
        control={
          <Checkbox
            checked={agreed}
            onChange={handleCheckboxChange}
            name="terms"
            color="primary"
          />
        }
        label={
          <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
            I agree to the{" "}
            <Button
              variant="text"
              onClick={handleClickOpen}
              sx={{ textTransform: "none", padding: 0, fontSize: "1.2rem" }}
            >
              Terms and Conditions
            </Button>
          </Typography>
        }
      />) : (
        <FormControlLabel
        control={
          <Checkbox
            checked={agreed}
            onChange={handleCheckboxChange}
            name="terms"
            color="primary"
            disabled
          />
        }
        label={
          <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
            I agree to the{" "}
            <Button
              variant="text"
              onClick={handleClickOpen}
              sx={{ textTransform: "none", padding: 0, fontSize: "1.2rem" }}
            >
              Terms and Conditions
            </Button>
          </Typography>
        }
      />
      )}
      

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="terms-and-conditions-title"
        aria-describedby="terms-and-conditions-description"
      >
        <DialogTitle id="terms-and-conditions-title">
          Terms and Conditions
        </DialogTitle>
        <DialogContent>
          {term ? (
            <DialogContentText id="terms-and-conditions-description">
              {/* Display the term content */}
              {term.content}
            </DialogContentText>
          ) : (
            <Typography variant="body2">
              No terms available for your role.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TermsAndConditionsForm;
