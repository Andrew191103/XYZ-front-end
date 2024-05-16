import React from 'react';
import './NotificationsModal.css';

const NotificationsModal = ({ isActive, onClose, notifications }) => {
    if (!isActive) return null;

    return (
        <div className="notifications-overlay" onClick={onClose}>
            <div className="notifications-content" onClick={(e) => e.stopPropagation()}>
                <div className="notifications-header">
                    <h2>All Notifications</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className="clear-all" onClick={() => notifications.forEach((_, i) => onClose(i))}>clear all</button>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                </div>
                <div className="notifications-body">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification-item">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-message">{notification.message}</div>
                            <button className="close-notification" onClick={() => notification.onClose(index)}>×</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;
