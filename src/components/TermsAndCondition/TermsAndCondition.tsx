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
interface TermsProps {
    onNext: (data:{
        terms: boolean;
    }) => void;
}
const TermsAndConditionsForm: React.FC<TermsProps> = ({onNext}) => {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    onNext({terms:agreed});
  },[agreed,onNext])

  return (
    <Box>
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
      />

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
          <DialogContentText id="terms-and-conditions-description">
            {/* Insert your Terms and Conditions content here */}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              rhoncus, arcu id consectetur scelerisque, justo urna vehicula
              eros, at laoreet elit nulla non ligula. Fusce bibendum sem vel
              magna blandit volutpat. Ut feugiat lobortis neque at bibendum.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </p>
            <p>
              Quisque id lectus at dolor facilisis bibendum. Ut consequat velit
              ac felis blandit, at tristique risus tempor. Nam id felis at odio
              congue malesuada. Integer facilisis quam eu facilisis ullamcorper.
              Praesent vitae diam nisl.
            </p>
          </DialogContentText>
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
