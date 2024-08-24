import React from 'react';
import './MessageStyles.css'; // Import the CSS file

const Message = ({ message, expanded, handleToggle }) => {
    return (
        <div className="accordion-item mb-4 accordion-item-custom">
            <h2 className="accordion-header" id={`heading${message.subject}`}>
                <button
                    className={`accordion-button accordion-button-custom ${expanded ? '' : 'collapsed'}`}
                    type="button"
                    onClick={handleToggle}
                    aria-expanded={expanded}
                    aria-controls={`collapse${message.subject}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <span style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{message.subject}</span>
                    <span className="text-muted ms-3">From: {message.Sender.user_name}</span>
                </button>
            </h2>
            <div
                id={`collapse${message.subject}`}
                className={`accordion-collapse collapse ${expanded ? 'show' : ''}`}
                aria-labelledby={`heading${message.subject}`}
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body accordion-body-custom">
                    {message.message}
                </div>
            </div>
        </div>
    );
};

export default Message;
