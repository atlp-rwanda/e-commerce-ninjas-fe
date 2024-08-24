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
import { FullScreenPdfView } from "../FullScreenPdfView/FullScreenPdfView";
import { IoCloseCircleOutline } from "react-icons/io5";
interface TermsProps {
  onNext: (data: { terms: boolean }) => void;
}
const TermsAndConditionsForm: React.FC<TermsProps> = ({ onNext }) => {
  const [agreed, setAgreed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { terms } = useAppSelector((state) => state.admin);
  const [content, setContent] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
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
        if (userTerms.content === null) {
          setFileUrl(userTerms.pdfUrl);
        } else if (userTerms.pdfUrl === null) {
          setContent(userTerms.content);
        }
      }
    }
  }, [user, terms]);
  return (
    <Box>
      {fileUrl || content ? (
        <>
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
        </>
      ) : (
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

      {fileUrl && open && (
        <FullScreenPdfView
          pdfUrl={fileUrl}
          open={open}
          onClose={setOpen(false)}
        />
      )}

      {content && open && (
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
            {content ? (
              <DialogContentText id="terms-and-conditions-description">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </DialogContentText>
            ) : (
              <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
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
      )}

      {fileUrl == null && content == null && open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="terms-and-conditions-title"
          aria-describedby="terms-and-conditions-description"
        >
          <DialogTitle id="terms-and-conditions-title">
            Terms and Conditions
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="terms-and-conditions-description">
              <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
                No Terms and Conditions found. Please contact the admin to
                upload them.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default TermsAndConditionsForm;
