import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GeneralStyles.css';
import CreateMessageForm from '../forms/CreateMessageForm';
import Inbox from './Inbox';
import Sent from './Sent';

const MessageDashboard = () => {
  const [view, setView] = useState('compose');

  const renderView = () => {
    switch (view) {
      case 'compose':
        return <CreateMessageForm />;
      case 'inbox':
        return <Inbox />;
      case 'sent':
        return <Sent />;
      default:
        return <CreateMessageForm />;
    }
  };

  return (
    <div className="message-container message-mt-2">
      <h1 className="message-text-center message-mb-2" style={{color:"#5d7285"}}>Messages Dashboard</h1>
      <div className="message-text-center message-mb-2">
        <button className="btn btn-primary mx-2" onClick={() => setView('compose')}>Compose</button>
        <button className="btn btn-primary mx-2" onClick={() => setView('inbox')}>Inbox</button>
        <button className="btn btn-primary mx-2" onClick={() => setView('sent')}>Sent</button>
      </div>
      <div className="message-section">
        {renderView()}
      </div>
    </div>
  );
};

export default MessageDashboard;
