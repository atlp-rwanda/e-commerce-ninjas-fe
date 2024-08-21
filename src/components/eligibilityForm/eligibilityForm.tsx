/* eslint-disable */
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Button } from '@mui/material';

interface EligibilityFormProps {
  onNext: (data: {
    businessName: string;
    Tin: string;
    rdbDocument: File | null;
    businessDescription: string; // Added field
  }) => void;
}

interface FormData {
  businessName: string;
  Tin: string;
  rdbDocument: File | null;
  businessDescription: string; // Added field
}

const EligibilityForm: React.FC<EligibilityFormProps> = ({ onNext }) => {
  const [variant, setVariant] = useState<ModalDialogProps['variant'] | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    Tin: '',
    rdbDocument: null,
    businessDescription: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];
      if (file && file.type !== 'application/pdf') {
        setVariant('plain');
        return;
      }
      setFormData({
        ...formData,
        [name]: file || null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      });
    }
  };
  

  useEffect(() => {
    onNext(formData);
  }, [formData, onNext]);

  return (
    <>
      <form className="eligibility-form">
          <div className="eligibility-class-div">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              required
            />
          </div>
          <div className="eligibility-class-div">
            <label htmlFor="Tin">Tax Identification Number (TIN)</label>
            <input
              type="text"
              id="Tin"
              name="Tin"
              value={formData.Tin}
              onChange={handleChange}
              placeholder="TIN"
              required
            />
          </div>
          <div className="eligibility-class-div">
            <label htmlFor="businessDescription">Business Description</label>
            <textarea
              id="businessDescription"
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              placeholder="Business Description"
              className="desc"
              required
            />
          </div>
          <div className="eligibility-class-div">
            <label htmlFor="rdbDocument">Upload RDB Document (PDF only)</label>
            <input
              type="file"
              id="rdbDocument"
              name="rdbDocument"
              accept=".pdf"
              onChange={handleChange}
            />
          </div>
        
      </form>
      <Modal open={!!variant} onClose={() => setVariant(undefined)}>
        <ModalDialog variant={variant} sx={{ fontSize: '1.8rem' }}>
          <ModalClose />
          <DialogTitle sx={{ fontSize: '1.8rem' }}>Info</DialogTitle>
          <DialogContent>We only accept PDF files.</DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default EligibilityForm;