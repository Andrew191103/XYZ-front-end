import React, { useState } from 'react';
import './WarehouseModal.css';

const WarehouseModal = ({ isActive, onClose, batches, onConfirm }) => {
    const [selectedBatches, setSelectedBatches] = useState([]);

    if (!isActive) return null;

    const handleSelectBatch = (batchId) => {
        setSelectedBatches(prevSelected =>
            prevSelected.includes(batchId)
                ? prevSelected.filter(id => id !== batchId)
                : [...prevSelected, batchId]
        );
    };

    const handleSelectAll = () => {
        if (selectedBatches.length === batches.length) {
            setSelectedBatches([]);
        } else {
            setSelectedBatches(batches.map(batch => batch.id));
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">All Packages</div>
                <div className="modal-body">
                    <div>
                        <input
                            type="checkbox"
                            checked={selectedBatches.length === batches.length}
                            onChange={handleSelectAll}
                        />
                        <label>Select All</label>
                    </div>
                    {batches.map((batch) => (
                        <div key={batch.id} className="batch-item">
                            <input
                                type="checkbox"
                                checked={selectedBatches.includes(batch.id)}
                                onChange={() => handleSelectBatch(batch.id)}
                            />
                            <label>{`Batch ${batch.id} Package`}</label>
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="confirm-button" onClick={() => onConfirm(selectedBatches)}>Send to Warehouse</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default WarehouseModal;
