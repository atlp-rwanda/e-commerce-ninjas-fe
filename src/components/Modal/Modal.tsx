// SuccessModal.tsx

import React from 'react';


interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Success!</h2>
        <p>Your OTP verification was successful Verified.</p>
        <p>Click continue to log In</p>
        <button type="button" onClick={onClose}>Continue</button>
      </div>
    </div>
  );
};

export default SuccessModal;
