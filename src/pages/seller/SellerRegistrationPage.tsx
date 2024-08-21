/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/seller/Sidebar';
import { BusinessDetails } from '../../components/seller/BusinessDetails';
import { SellerDetails } from '../../components/seller/SellerDetails';
import { PaymentDetails } from '../../components/seller/PaymentDetails';
import { useAppDispatch } from '../../store/store';
import { registerAsSeller } from '../../store/features/auth/authSlice';
export const SellerRegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<any>()
    const dispatch = useAppDispatch()
    const [collectedData, setCollectedData] = useState({
        businessDetails: {
            businessName: '',
            tin: '',
            businessDescription: '',
            rdbDocument: null,
            agreed: false,
        },
        sellerDetails: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
        },
        paymentDetails: {
            mobilePayment: false,
            bankPayment: false,
            bankAccount: '',
            bankName: '',
        },
    });

    // Function to update the form data
    const updateFormData = (newData: any, stepName: string) => {
        setCollectedData(prev => ({
            ...prev,
            [stepName]: {
                ...prev[stepName],
                ...newData,
            },
        }));
    };


    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async() => {
       const formData =  new FormData();
        formData.append("businessName", collectedData.businessDetails.businessName);
        formData.append("Tin", collectedData.businessDetails.tin);
        formData.append("file", collectedData.businessDetails.rdbDocument);  
        formData.append("businessDescription", collectedData.businessDetails.businessDescription);
        formData.append("firstName", collectedData.sellerDetails.firstName);
        formData.append("lastName", collectedData.sellerDetails.lastName);
        formData.append("email", collectedData.sellerDetails.email);
        formData.append("password", collectedData.sellerDetails.password);
        formData.append("mobilePayment", String(collectedData.paymentDetails.mobilePayment));
        formData.append("bankPayment",String( collectedData.paymentDetails.bankPayment));
        formData.append("bankAccount", collectedData.paymentDetails.bankAccount);
        formData.append("bankName", collectedData.paymentDetails.bankName);
        formData.append("terms", collectedData.businessDetails.agreed.toString());
        formData.append("phone", collectedData.sellerDetails.phone);
        setData(formData);
    };

    useEffect(()=>{
        if(data)
        dispatch(registerAsSeller(data))
    },[data]);

    return (
        <div className="wrapper">
            <div className='seller-registration'>
                <Sidebar />
                <div className='registration-container'>
                <h2>Merchant Registration</h2>
                <div className="step-indicators">
                    <span className={step === 1 ? 'active' : ''}>Business Details</span>
                    <span className={step === 2 ? 'active' : ''}>Owner Details</span>
                    <span className={step === 3 ? 'active' : ''}>Payment Details</span>
                </div>

                <div>
            {step === 1 && (
                <BusinessDetails
                    nextStep={nextStep}
                    formData={collectedData.businessDetails}
                    updateFormData={(data) => updateFormData(data, 'businessDetails')}
                />
            )}
            {step === 2 && (
                <SellerDetails
                    nextStep={nextStep}
                    prevStep={prevStep}
                    formData={collectedData.sellerDetails}
                    updateFormData={(data) => updateFormData(data, 'sellerDetails')}
                />
            )}
            {step === 3 && (
                <PaymentDetails
                    prevStep={prevStep}
                    formData={collectedData.paymentDetails}
                    updateFormData={(data) => updateFormData(data, 'paymentDetails')}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
                </div>
            </div>
        </div>
    )
}
