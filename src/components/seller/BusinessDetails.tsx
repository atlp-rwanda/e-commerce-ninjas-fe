/* eslint-disable */
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from "@mui/material";

interface Props {
    nextStep: () => void;
    formData: any;
    updateFormData: (data: any) => void;
}

export const BusinessDetails: React.FC<Props> = ({ nextStep, formData, updateFormData }) => {
    const [localData, setLocalData] = useState(formData);
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalData({ ...localData, [name]: value });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalData({ ...localData, agreed: event.target.checked });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setLocalData({ ...localData, rdbDocument: file });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFormData(localData);
        nextStep();
    };

    return (
        <div className="business-details">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Business Name<span>*</span></label>
                    <input type="text" name="businessName" value={localData.businessName} onChange={handleChange} placeholder="Enter business name" required />
                </div>
                <div>
                    <label>Business Tax Identification Number (TIN)<span>*</span></label>
                    <input type="number" name="tin" value={localData.tin} onChange={handleChange} placeholder="Enter business Tin number" required />
                </div>
                <div>
                    <label>Business Description <span>*</span></label>
                    <textarea name="businessDescription" value={localData.businessDescription} onChange={handleChange} placeholder='Enter business Description' required></textarea>
                </div>
                <div className="upload-section">
                    <label>RDB Document <span>*</span></label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className='check-group'>
                    <input type="checkbox" checked={localData.agreed} onChange={handleCheckboxChange} name="agreed" required />
                    <label htmlFor="terms">
                        <Typography variant="body1" sx={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
                            I agree to the{" "}
                            <Button variant="text" onClick={() => setOpen(true)} sx={{ textTransform: "none", padding: 0, fontSize: "1.4rem", color: "#ff6d18" }}>
                                Terms and Conditions
                            </Button>
                        </Typography>
                    </label>
                    <Box>
                        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="terms-and-conditions-title" aria-describedby="terms-and-conditions-description">
                            <DialogTitle id="terms-and-conditions-title">Terms and Conditions</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="terms-and-conditions-description">
                                    {/* Insert your Terms and Conditions content here */}
                                    <p>Lorem ipsum...</p>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color="primary">Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </div>
                <div className="form-control">
                    <button type='submit' className='continue'>Continue</button>
                </div>
            </form>
        </div>
    );
};
