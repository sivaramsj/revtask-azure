import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { userContext } from '../Context/UserContextComponent';
import './GeneralStyles.css';

const Sent = () => {
  const { userDetail, projects } = useContext(userContext);
  const [sentMessages, setSentMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const response = await api.get(`/messages/sender/${userDetail.employeeId}`);
        setSentMessages(response.data.data || []);
      } catch (err) {
        setError('No sent messages');
        console.error(err);
      }
    };

    fetchSentMessages();
  }, []);

  return (
    <div className="message-container message-mt-2">
      <h2 className="message-text-center message-mb-2">Sent Messages</h2>
      {error && <div className="message-alert message-alert-danger">{error}</div>}
      <ul className="message-list">
        {Array.isArray(sentMessages) && sentMessages.length > 0 ? (
          sentMessages.map((message) => (
            <li key={message.messageId} className="message-list-item">
              <strong>Subject:</strong> {message.subject}<br />
              <strong>To:</strong> {message.receiver.employeeName}<br />
              <strong>Content:</strong> {message.context}
            </li>
          ))
        ) : (
          <p className="message-text-center">No sent messages found.</p>
        )}
      </ul>
    </div>
  );
};

export default Sent;
