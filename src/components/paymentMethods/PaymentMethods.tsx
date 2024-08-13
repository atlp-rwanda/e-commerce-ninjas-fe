/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Box } from "@mui/material";

interface PaymentMethodsProps {
  onNext: (data :{
    mobilePayment: boolean;
    bankPayment: boolean;
    mobileNumber: string;
    bankAccount: string;
  }) => void;
}

interface PaymentMethodsState {
  mobilePayment: boolean;
  bankPayment: boolean;
}

interface PaymentDetailsState {
  mobileNumber: string;
  bankAccount: string;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onNext }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsState>({
    mobilePayment: false,
    bankPayment: false,
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsState>({
    mobileNumber: "",
    bankAccount: "",
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethods({
      ...paymentMethods,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    onNext({
      ...paymentMethods,
      ...paymentDetails,
    });
  }, [paymentMethods, paymentDetails, onNext]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={paymentMethods.mobilePayment}
            onChange={handleCheckboxChange}
            name="mobilePayment"
            color="primary"
            disabled
          />
        }
        label="Mobile Payment"
      />
      {paymentMethods.mobilePayment && (
        <input
          id="mobileNumber"
          name="mobileNumber"
          value={paymentDetails.mobileNumber}
          onChange={handleInputChange}
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "1.2rem",
          }}
        />
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={paymentMethods.bankPayment}
            onChange={handleCheckboxChange}
            name="bankPayment"
            sx={{
              color: "#ff6d18",
            }}
          />
        }
        label="Bank Payment"
      />
      {paymentMethods.bankPayment && (
        <input
          type="text"
          id="bankAccount"
          name="bankAccount"
          placeholder="Bank Account Number"
          value={paymentDetails.bankAccount}
          onChange={handleInputChange}
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: "100%",
            border: "1px solid #ff6d18",
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        />
      )}
    </Box>
  );
};

export default PaymentMethods;
