import React from 'react';
import './PackagesModal.css';

const PackagesModal = ({ isActive, onClose, packages }) => {
    if (!isActive) return null;

    return (
        <div className="packages-overlay" onClick={onClose}>
            <div className="packages-content" onClick={e => e.stopPropagation()}>
                <div className="packages-header">
                    <h2>All Packages</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="packages-body">
                    <div className="select-all">
                        <input type="checkbox" id="select-all" />
                        <label htmlFor="select-all">select all</label>
                    </div>
                    {packages.map((pkg, index) => (
                        <div key={index} className="package-item">
                            <input type="checkbox" id={`package-${index}`} />
                            <label htmlFor={`package-${index}`}>Batch {pkg.id} Package</label>
                            <button className="package-options">⋮</button>
                        </div>
                    ))}
                </div>
                <div className="packages-footer">
                    <button className="send-button">Send to Warehouse</button>
                </div>
            </div>
        </div>
    );
};

export default PackagesModal;
