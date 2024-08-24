import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import logo from '../../images/logo.png'; // Adjust paths if needed
import humanImage from '../../images/homeimage.png'; // Adjust paths if needed
import ResetButton from '../buttons/ResetButton'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer'; // Import the new Footer component
import './LandingPage.css';

const LandingPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get('/clients');
                const clientData = response.data.data;
                if (Array.isArray(clientData)) {
                    setClients(clientData);
                } else {
                    setError('Unexpected data format');
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError('Error fetching clients');
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    const handleButtonClick = () => {
        navigate("/login");
    };

    return (
        <div className="landing-container">
            <nav className="landing-navbar navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <a className="navbar-brand" href="#">REV TASK MANAGEMENT</a>
            </nav>
            <div className="custom-container mt-1">
                <div className="row align-items-center p-3">
                    <div className="col-lg-6 text-center text-lg-left p-3">
                        <img src={logo} alt="logo" id="landing-logo" className="img-fluid mb-3" />
                        <h2 className="landing-title">REVTASK MANAGEMENT SOFTWARE</h2>
                        <p className="landing-description">
                            RevTaskManagement streamlines task organization and enhances productivity for work and personal tasks. It offers efficient task delegation and built-in effort estimation to help users plan and manage tasks effectively.
                        </p>
                        <ResetButton onClick={handleButtonClick} value="Get Started" />
                    </div>
                    <div className="col-lg-6 text-center">
                        <img src={humanImage} alt="Human Illustration" className="img-fluid" />
                    </div>
                </div>
            </div>
            <div className="custom-container mt-5">
                <h2 className="landing-about-title">About Our Application</h2>
                <p className="landing-about-description">
                    RevTaskManagement is designed to make your task management easier and more efficient. With our application, you can:
                </p>
                <ul className="landing-about-points">
                    <li className="shadow-sm p-3 mb-4 bg-light rounded">Efficiently manage tasks across multiple projects.</li>
                    <li className="shadow-sm p-3 mb-4 bg-light rounded">Track milestones and deadlines with ease.</li>
                    <li className="shadow-sm p-3 mb-4 bg-light rounded">Utilize built-in effort estimation tools for better planning.</li>
                    <li className="shadow-sm p-3 mb-4 bg-light rounded">Maintain a high level of productivity with organized workflows.</li>
                </ul>
            </div>
            <div className="custom-container mt-5 mb-5">
                <h2 className="landing-clients-title">Our Clients</h2>
                {loading && <p>Loading clients...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <div className="landing-clients-box">
                        {clients.map(client => (
                            <div key={client.clientId} className="landing-client-company-name">
                                {client.companyName}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer /> {/* Add the Footer component */}
        </div>
    );
};

export default LandingPage;