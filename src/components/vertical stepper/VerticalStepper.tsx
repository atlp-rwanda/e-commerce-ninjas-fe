/* eslint-disable */
import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@mui/material';

const steps = [
  {
    label: 'Eligibility Requirements',
    description: 'Ensure you meet all the eligibility criteria to become a seller on our platform.',
  },
  {
    label: 'Account Setup',
    description: 'Create your seller account by providing your personal and business details.',
  },
  {
    label: 'Seller Fees',
    description: 'Understand the fees associated with selling on our platform, including listing and transaction fees.',
  },
  {
    label: 'Product Listing',
    description: 'Learn how to list your products, including setting prices, uploading images, and writing descriptions.',
  },
  {
    label: 'Terms & Conditions',
    description: 'Review and agree to the terms and conditions to start selling on our platform.',
  },
];

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re now a seller!</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default VerticalStepper;