/* eslint-disable */
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog">
            <div className="confirm-dialog-content">
                <div className="modal-header">
                <DeleteIcon className='icon__delete' /> {title}
                </div>
                <p dangerouslySetInnerHTML={{ __html: message }} />
                <div className="modal-footer">
                    <button onClick={onCancel} className='cancel-btn'>Cancel</button>
                    <button onClick={onConfirm} className='delete-btn'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
