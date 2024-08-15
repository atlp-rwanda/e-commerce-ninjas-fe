/* eslint-disable */
import React, { useState } from "react";

interface Props {
  prevStep: () => void;
  formData: any;
  updateFormData: (data: any) => void;
  handleSubmit: () => void;
}

export const PaymentDetails: React.FC<Props> = ({ prevStep, formData, updateFormData, handleSubmit }) => {
  const [localData, setLocalData] = useState(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <div className="payment-details">
      <form onSubmit={handleFinalSubmit}>
        <div className="check-form">
          <div>
            <input
              type="checkbox"
              name="mobilePayment"
              id="mobilePayment"
              onChange={handleCheckboxChange}
              checked={formData.mobilePayment}
              disabled
            />
            <label htmlFor="mobilePayment">Mobile Payment</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="bankPayment"
              id="bankPayment"
              checked={formData.bankPayment}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="bankPayment">Bank Payment</label>
          </div>
        </div>
        {formData.bankPayment && (
          <>
            <div>
              <label>
                Card Number / Bank Account<span>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter card number / bank account"
                name="bankAccount"
                id="bankAccount"
                onChange={handleChange}
                value={formData.bankAccount}
                required
              />
            </div>
            <div>
              <label htmlFor="bankName">Bank Name<span>*</span></label>
              <input
                type="text"
                name="bankName"
                id="bankName"
                onChange={handleChange} 
                value={formData.bankName}
                placeholder="Enter Bank Name"
              />
            </div>
          </>
        )}
        {formData.mobilePayment && (
          <div>
            <label htmlFor="mobileNumber">
              Mobile Number<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              id="mobileNumber"
              onChange={handleChange}
              value={formData.mobileNumber}
              required
            />
          </div>
        )}
        <div className="groupe-form">
          <button onClick={prevStep}>Back</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
