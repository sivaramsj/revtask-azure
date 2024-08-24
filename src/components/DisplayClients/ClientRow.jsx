import React from 'react';
import './ClientRow.css';

function ClientRow({ client, openModal }) {
    const { companyName, pointOfContact, email, contact, address } = client;

    const handleClick = () => {
        const content = (
            <div style={{
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#ffffff',
                maxWidth: '600px',
                width: '100%',
                margin: 'auto',
                fontFamily: 'Arial, sans-serif',
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    borderBottom: '2px solid #e0e0e0',
                    paddingBottom: '0.5rem',
                }}>
                    {companyName}
                </h2>
                <ul style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: '0',
                    fontSize: '1rem',
                    color: '#666666',
                    lineHeight: '1.5',
                }}>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong style={{ fontWeight: '600', color: '#444444' }}>Point of Contact:</strong>
                        <span>{pointOfContact}</span>
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong style={{ fontWeight: '600', color: '#444444' }}>Email:</strong>
                        <span>{email}</span>
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong style={{ fontWeight: '600', color: '#444444' }}>Contact:</strong>
                        <span>{contact}</span>
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong style={{ fontWeight: '600', color: '#444444' }}>Address:</strong>
                        <span>{address}</span>
                    </li>
                </ul>
            </div>
        );
        openModal(content);
    };

    return (
        <div className="client-row" onClick={handleClick}>
            <div className="client-info">
                <h6>{companyName}</h6>
                <p>{pointOfContact}</p>
                <button className="view-details-button">View Details</button>
            </div>
        </div>
    );
}

export default ClientRow;
