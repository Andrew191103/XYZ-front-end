import React from 'react';
import './App.css';

function Archive({ archivedBatches }) { // Accept archivedBatches as a prop
    return (
        <div className="archive-content">
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Centra</th>
                        <th>Shipment Status</th>
                        <th>Weight</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {archivedBatches.map((batch, index) => (
                        <tr key={index}>
                            <td>{batch.id}</td>
                            <td>{batch.name}</td>
                            <td>{batch.steps[5].completed ? 'Completed' : 'In Progress'}</td>
                            <td>{batch.steps[0].details ? batch.steps[0].details.weight : 'N/A'}</td>
                            <td>Notes here</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <span>Showing {archivedBatches.length} out of {archivedBatches.length}</span>
                <div className="page-controls">
                    <span>Previous</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>Next</span>
                </div>
            </div>
        </div>
    );
}

export default Archive;
