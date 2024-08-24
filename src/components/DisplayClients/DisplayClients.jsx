import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';
import './DisplayClients.css';
import api from '../../config/api';

function DisplayClients({ openModal }) {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await api.get('/clients');
            setClients(response.data.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    

    return (
        <>
            <div className="client-display-component">
                <div className="clients-container">
                    {Array.isArray(clients) && clients.length > 0 ? (
                        clients.map((client) => <ClientRow key={client.clientId} client={client} openModal={openModal} />)
                    ) : (
                        <p>No clients available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default DisplayClients;
