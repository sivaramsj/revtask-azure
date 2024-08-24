import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { userContext } from '../Context/UserContextComponent';
import './GeneralStyles.css';

const Inbox = () => {
  const { userDetail, projects } = useContext(userContext);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInboxMessages = async () => {
      try {
        const response = await api.get(`/messages/receiver/${userDetail.employeeId}`);
        setInboxMessages(response.data.data || []);
      } catch (err) {
        setError('No messages in inbox');
        console.error(err);
      }
    };

    fetchInboxMessages();
  }, []);

  return (
    <div className="message-container message-mt-2">
      <h2 className="message-text-center message-mb-2">Inbox</h2>
      {error && <div className="message-alert message-alert-danger">{error}</div>}
      <ul className="message-list">
        {Array.isArray(inboxMessages) && inboxMessages.length > 0 ? (
          inboxMessages.map((message) => (
            <li key={message.messageId} className="message-list-item">
              <strong>Subject:</strong> {message.subject}<br />
              <strong>From:</strong> {message.sender.employeeName}<br />
              <strong>Content:</strong> {message.context}
            </li>
          ))
        ) : (
          <p className="message-text-center">No messages found.</p>
        )}
      </ul>
    </div>
  );
};

export default Inbox;
