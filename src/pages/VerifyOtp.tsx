/* eslint-disable */

import React,{useState} from "react";
import { IoReloadSharp } from "react-icons/io5";
import SuccessModal from "../components/Modal/Modal";

const VerifyOtp: React.FC = () => {
      const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleContinue = () => {
    // Add logic here for handling 'Continue' action (e.g., API calls, validation)
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };
    return (
 <main>
  <div className="container">
        <h1>OTP Verification</h1>
        <h5>Enter code you have received </h5>
        <div className="input">
             <input className="box"/>
              <input className="box"/>
               <input className="box"/>
                <input className="box"/>
                 <input className="box"/>
                  <input className="box"/>
        </div>
        
        <h5 className="invalid">The code you entered is invalid</h5>
         <h5 className="resend-code">
        <IoReloadSharp className="reload-icon" /> Resend The code
      </h5>
        <div className="btn">
            <button className="resend-button">Cancel</button>
            <button className="resend-button"onClick={handleContinue}>Continue</button>
        </div>
       
 <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </div>
 </main>
    )

  

 
    };

export default VerifyOtp;
