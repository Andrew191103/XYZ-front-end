import React from 'react';
import './Modal.css';

const Modal = ({ isActive, onClose, content, onConfirm, headerContent, buttonLabel, step }) => {
    if (!isActive) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {headerContent && <div className="modal-header">{headerContent}</div>}
                <div className="step-5">
                    {step === 4 && (
                        <>
                            <p>Package ID -</p>
                            <p>Order Time -</p>
                            <p>Sender</p>
                            <p>Recipient</p>
                            <p>Expedition</p>
                            <p>Weight</p>
                            <p>Status</p>
                        </>
                    )}
                    {step === 5 && (
                        <>
                            <h2>Reception</h2>
                            <div className="modal-field">
                                <label>Delivery ID</label>
                                <span>0934808042480</span>
                            </div>
                            <div className="modal-field">
                                <label>Data Received</label>
                                <input type="date" />
                            </div>
                            <div className="modal-field">
                                <label>Rescalling</label>
                                <span>The recommended weight should be between 10 - 30 kg</span>
                            </div>
                            <div className="modal-field">
                                <label>Before Scalling</label>
                                <span>5 kg</span>
                            </div>
                            <div className="modal-field">
                                <label>After Scalling</label>
                                <input type="text" placeholder="kg" />
                            </div>
                        </>
                    )}
                    {content}
                </div>
                <div className="modal-footer">
                    <button onClick={onConfirm} className="confirm-button">{buttonLabel}</button>
                    <button onClick={onClose} className="close">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
