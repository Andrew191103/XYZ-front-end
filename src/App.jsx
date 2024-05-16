import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './App.css';
import Modal from './modal';
import Archive from './Archive';
import NotificationsModal from './NotificationsModal';
import WarehouseModal from './WarehouseModal'; // Add this import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faShoppingCart, faArchive, faUserCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function createSteps() {
    return [
        { step: 'Gather Leaves', completed: false, details: { weight: '28 KG' } },
        { step: 'Wet Leaves', completed: false },
        { step: 'Dry Leaves', completed: false },
        { step: 'Flour Leaves', completed: false },
        { step: 'Deliver', completed: false },
        { step: 'Rescale', completed: false }
    ];
}

function createCentras() {
    const centras = [];
    for (let i = 1; i <= 36; i++) {
        centras.push({
            id: i,
            name: `Centra ${i}`,
            batches: [
                { id: i * 100 + 1, name: `Batch 1`, steps: createSteps() },
                { id: i * 100 + 2, name: `Batch 2`, steps: createSteps() }
            ]
        });
    }
    return centras;
}

function MainContent() {
    const location = useLocation();
    const [centras, setCentras] = useState(createCentras());
    const [activeCentraIndex, setActiveCentraIndex] = useState(0);
    const [expandedBatches, setExpandedBatches] = useState({});
    const [modalActive, setModalActive] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [onConfirm, setOnConfirm] = useState(null);
    const [headerContent, setHeaderContent] = useState("");
    const [buttonLabel, setButtonLabel] = useState("Confirm");
    const [modalStep, setModalStep] = useState(null); // Add state for modalStep
    const [warehouseModalActive, setWarehouseModalActive] = useState(false);
    const [archivedBatches, setArchivedBatches] = useState([]); // Add state for archived batches
    const [notificationsModalActive, setNotificationsModalActive] = useState(false);
    const [notifications, setNotifications] = useState([
        { title: 'Notification Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', onClose: (index) => handleNotificationClose(index) },
        { title: 'Notification Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', onClose: (index) => handleNotificationClose(index) },
        { title: 'Notification Title', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', onClose: (index) => handleNotificationClose(index) },
    ]);

    const toggleDropdown = (batchId) => {
        setExpandedBatches(prev => ({
            ...prev,
            [batchId]: !prev[batchId]
        }));
    };

    const handleStepClick = (batchId, stepIndex, step) => {
        if (stepIndex > 0 && !centras[activeCentraIndex].batches.find(b => b.id === batchId).steps[stepIndex - 1].completed) {
            alert("Please complete the previous steps first.");
            return;
        }

        let header = '';
        let buttonLabel = "Confirm";

        if (stepIndex === 1 || stepIndex === 2 || stepIndex === 3) {
            header = `Final ${step.step} weight: ${step.details ? step.details.weight : 'N/A'}`;
        }

        if (stepIndex === 4) { // Deliver step
            buttonLabel = "Received";
            header = "Package delivery is confirmed and ready for collection.";
        }

        if (stepIndex === 5) { // Rescale step
            buttonLabel = "Add to list";
            header = "Reception";
        }

        setModalContent(stepIndex === 4 || stepIndex === 5 ? '' : `Confirm completion of ${step.step}?`); // Set empty content for Deliver and Rescale steps
        setHeaderContent(header);
        setOnConfirm(() => () => completeStep(batchId, stepIndex));
        setModalActive(true);
        setButtonLabel(buttonLabel);
        setModalStep(stepIndex); // Set the current step
    };

    const completeStep = (batchId, stepIndex, data) => { // Accept data from modal
        console.log(data); // For debugging purposes, check the received data
        const newCentras = centras.map((centra, idx) => {
            if (idx === activeCentraIndex) {
                const newBatches = centra.batches.map(batch => {
                    if (batch.id === batchId) {
                        const newSteps = batch.steps.map((step, idx) =>
                            idx === stepIndex ? { ...step, completed: true } : step
                        );
                        return { ...batch, steps: newSteps };
                    }
                    return batch;
                });
                return { ...centra, batches: newBatches };
            }
            return centra;
        });

        setCentras(newCentras);
        setModalActive(false);
    };

    const handleNotificationClick = () => {
        setNotificationsModalActive(true);
    };

    const handleNotificationClose = (index) => {
        const newNotifications = notifications.filter((_, i) => i !== index);
        setNotifications(newNotifications);
    };

    const handleWarehouseConfirm = (selectedBatches) => {
        const batchesToArchive = selectedBatches.map(batchId => 
            centras.flatMap(centra => centra.batches).find(batch => batch.id === batchId)
        );

        setArchivedBatches(prevArchived => [...prevArchived, ...batchesToArchive]);
        setWarehouseModalActive(false);
    };

    return (
        <div className="container">
            {location.pathname !== '/archive' && (
                <div className="sidebar">
                    <h3>MORALM</h3>
                    {centras.map((centra, index) => (
                        <div key={centra.id} className={`centra ${index === activeCentraIndex ? 'active' : ''}`}
                             onClick={() => setActiveCentraIndex(index)}>
                            {centra.name}
                        </div>
                    ))}
                </div>
            )}
            <div className="content">
                <div className="header">
                    <div className="header-left">
                        {location.pathname === '/archive' && (
                            <Link to="/" className="back-button">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Link>
                        )}
                        <h1>{location.pathname === '/archive' ? 'History' : 'Processes'}</h1>
                    </div>
                    <div className="icons">
                        <FontAwesomeIcon icon={faBell} onClick={handleNotificationClick} />
                        <FontAwesomeIcon icon={faShoppingCart} onClick={() => setWarehouseModalActive(true)} />
                        {location.pathname !== '/archive' && (
                            <Link to="/archive" className="icon-link">
                                <FontAwesomeIcon icon={faArchive} />
                            </Link>
                        )}
                        <FontAwesomeIcon icon={faUserCircle} />
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={
                        centras[activeCentraIndex].batches.map(batch => (
                            <div key={batch.id} className="batch-row">
                                <button className="dropdown-button" onClick={() => toggleDropdown(batch.id)}>
                                    {batch.name}
                                </button>
                                {expandedBatches[batch.id] && (
                                    <div className="dropdown-content">
                                        {batch.steps.map((step, index) => (
                                            <div key={index} className={`step-container ${step.completed ? 'completed' : ''}`}
                                                 onClick={() => handleStepClick(batch.id, index, step)}>
                                                <div className="step-circle">{index + 1}</div>
                                                <div className="step-name">{step.step}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    } />
                    <Route path="/archive" element={<Archive archivedBatches={archivedBatches} />} />
                </Routes>
            </div>
            <Modal 
                isActive={modalActive} 
                onClose={() => setModalActive(false)} 
                content={modalContent} 
                onConfirm={onConfirm} 
                headerContent={headerContent} 
                buttonLabel={buttonLabel} 
                step={modalStep} // Pass step number
            />
            <WarehouseModal
                isActive={warehouseModalActive}
                onClose={() => setWarehouseModalActive(false)}
                batches={centras.flatMap(centra => centra.batches.filter(batch => batch.steps[5].completed))}
                onConfirm={handleWarehouseConfirm}
            />
            <NotificationsModal isActive={notificationsModalActive} onClose={() => setNotificationsModalActive(false)} notifications={notifications} />
        </div>
    );
}

function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}

export default App;
