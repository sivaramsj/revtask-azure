import React, { useState, useEffect } from 'react';
import Message from './Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../config/api';
import './MessageStyles.css'; // Import the CSS file

const DisplayMessages = () => {
    const [messages, setMessages] = useState([]);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
       api.get("http://localhost:3001/messages")
       .then((response)=>{
            setMessages(response.data);
       })
       .catch((err)=>{
            console.log("Error occurred: " + err);
       });
    }, []);

    const handleToggle = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <div className="container mt-5" style={{display:"block"}}>
            <div className="card card-custom" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <h2 className="card-title card-title-custom mb-4">Messages</h2>
                    <div className="accordion" id="accordionExample">
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                expanded={expanded === index}
                                handleToggle={() => handleToggle(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayMessages;
