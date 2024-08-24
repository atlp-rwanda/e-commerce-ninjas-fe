/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Typography,
  StepConnector,
  styled,
  stepConnectorClasses,
  StepIconProps,
  LinearProgress,
} from "@mui/material";
import EligibilityForm from "../eligibilityForm/eligibilityForm";
import PaymentMethods from "../paymentMethods/PaymentMethods";
import TermsAndConditionsForm from "../TermsAndCondition/TermsAndCondition";
import { Check } from "@mui/icons-material";
import {
  ICollectedData,
  IEligibilityData,
  IPaymentData,
  ITermsData,
} from "../../utils/types/store";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { userSubmitSellerRequest } from "../../store/features/user/userSlice";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#ff6d18",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#ff6d18",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#ff6d18",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#ff6d18",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = [
  {
    label: "Terms & Conditions",
    description:
      "Review and agree to the terms and conditions to start selling on our platform.",
  },
  {
    label: "Eligibility Requirements",
    description:
      "Ensure you meet all the eligibility criteria to become a seller on our platform.",
  },
  {
    label: "Payment methods",
    description: "Provide a payment method",
  },
];

const HorizontalStepper = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [collectedData, setCollectedData] = useState<ICollectedData>({
    termsAndConditions: {
      terms: false,
    },
    eligibility: {
      businessName: "",
      Tin: "",
      rdbDocument: null,
      businessDescription: "",
    },
    paymentMethods: {},
  });
  const [sendData, setSendData] = useState<any>();
  const [stepData, setStepData] = useState<any>(null);
  const handleNext = () => {
    const updateData = { ...collectedData };

    switch (activeStep) {
      case 0:
        updateData.termsAndConditions = stepData as ITermsData;
        break;
      case 1:
        updateData.eligibility = stepData as IEligibilityData;
        break;
      case 2:
        updateData.paymentMethods = stepData as IPaymentData;
        handleCollectedData(updateData);
        break;
      default:
        break;
    }
    setCollectedData(updateData);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCollectedData = async (data: ICollectedData) => {
    const formData = new FormData();
    formData.append("businessName", data.eligibility.businessName);
    formData.append("Tin", data.eligibility.Tin);
    formData.append("file", data.eligibility.rdbDocument);
    formData.append(
      "businessDescription",
      data.eligibility.businessDescription
    );
    formData.append("bankAccount", data.paymentMethods.bankAccount);
    formData.append("bankPayment", data.paymentMethods.bankPayment);
    formData.append("mobilePayment", data.paymentMethods.mobilePayment);
    formData.append("mobileNumber", data.paymentMethods.mobileNumber);
    formData.append("terms", data.termsAndConditions.terms.toString());
    setSendData(formData);
  };

  const formStepContent = (step: { label: string }) => {
    switch (step.label) {
      case "Eligibility Requirements":
        return <EligibilityForm onNext={setStepData} />;
      case "Payment methods":
        return <PaymentMethods onNext={setStepData} />;
      case "Terms & Conditions":
        return <TermsAndConditionsForm onNext={setStepData} />;
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    if (sendData) {
      dispatch(userSubmitSellerRequest(sendData));
    }
  }, [sendData]);
  return (
    <div className="horizontalStepper">
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
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<QontoConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {steps.map((step, index) => (
          <div key={step.label}>
            {activeStep === index && (
              <Box sx={{}}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {formStepContent(step)}
                </div>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                </Box>
              </Box>
            )}
          </div>
        ))}

        {activeStep === steps.length && (
          <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - we will get to you shortly!
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          </div>
        )}
      </Box>
    </div>
  );
};

export default HorizontalStepper;
