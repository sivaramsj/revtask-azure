import React, { useState } from 'react';
import './Form.css';
import api from '../../config/api';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientForm = ({ isUpdate = false }) => {
    const [client, setClient] = useState( {
        clientId: '',
        companyName: '',
        pointOfContact: '',
        email: '',
        contact: '',
        address: ''
    });

   

    const [searchName, setSearchName] = useState('');
    const [isClientFound, setIsClientFound] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get(`/clients/name?name=${searchName}`);
            console.log(response.data.data);
            setClient(response.data.data);
            setIsClientFound(true);
        } catch (error) {
            // console.error('Error fetching client data:', error);
            alert("NO Such client")
            setIsClientFound(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdate && isClientFound) {
                // Update client
                await api.put(`/clients/${client.clientId}`, client);
                toast.success("client updated successfully")
            } else {
                // Create new client
                const response = await api.post('/clients', client);
                toast.success("client created successfully")
                console.log('Client created:', response.data);
            }

            setClient({
                clientId: '',
                companyName: '',
                pointOfContact: '',
                email: '',
                contact: '',
                address: ''
            });
            setSearchName(''); 
            setIsClientFound(false);
        } catch (error) {
            console.error('Error creating/updating client:', error);
        }
    };

    return (
        <div className="container mt-5 update-component">
            {isUpdate && (
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Enter Client Name to Search ..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e); 
                            }
                        }}
                    />
                    <button onClick={handleSearch} className="btn btn-primary">Search</button>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="form">
                <h2>{isUpdate ? 'Update Client' : 'Create Client'}</h2>
                <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="companyName"
                        name="companyName"
                        value={client.companyName}
                        onChange={handleChange}
                        required
                        disabled={isUpdate && !isClientFound} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pointOfContact" className="form-label">Point of Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pointOfContact"
                        name="pointOfContact"
                        value={client.pointOfContact}
                        onChange={handleChange}
                        required
                        disabled={isUpdate && !isClientFound}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Contact Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={client.email}
                        onChange={handleChange}
                        required
                        disabled={isUpdate && !isClientFound}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="contact"
                        name="contact"
                        value={client.contact}
                        onChange={handleChange}
                        required
                        disabled={isUpdate && !isClientFound}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        value={client.address}
                        onChange={handleChange}
                        required
                        disabled={isUpdate && !isClientFound}
                    />
                </div>
                <div className="button-container">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isUpdate && !isClientFound}
                    >
                        {isUpdate ? 'Update Client' : 'Create Client'}
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default ClientForm;
