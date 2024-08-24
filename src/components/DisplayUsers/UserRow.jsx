import React from 'react';
import './UserRow.css';

function UserRow({ employee, openModal }) {
  const { employeeName, role, email, description, dateOfJoining, phone, status, skills } = employee;

  const handleClick = () => {
    const listItemStyle = {
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '0.5rem',
    };
  
    const strongStyle = {
      fontWeight: '600',
      color: '#444444',
      marginBottom: '0.5rem',
    };
  
    const spanStyle = {
      color: '#000000',
      marginBottom: '0.5rem',
    };
  
    const content = (
      <div style={{
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        maxWidth: '600px',
        width:'100%',
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
          {employee.employeeName}
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
          fontSize: '1rem',
          color: '#666666',
          lineHeight: '1.5',
        }}>
          <li style={listItemStyle}>
            <strong style={strongStyle}>Email:</strong>
            <span style={spanStyle}>{email}</span>
          </li>
          <li style={listItemStyle}>
            <strong style={strongStyle}>Description:</strong>
            <span style={spanStyle}>{description}</span>
          </li>
          <li style={listItemStyle}>
            <strong style={strongStyle}>Date of Joining:</strong>
            <span style={spanStyle}>{new Date(dateOfJoining).toLocaleDateString()}</span>
          </li>
          <li style={listItemStyle}>
            <strong style={strongStyle}>Phone:</strong>
            <span style={spanStyle}>{phone}</span>
          </li>
          <li style={listItemStyle}>
            <strong style={strongStyle}>Status:</strong>
            <span style={spanStyle}>{status}</span>
          </li>
          <li style={listItemStyle}>
            <strong style={strongStyle}>Skills:</strong>
            <span style={spanStyle}>{skills.length > 0 ? skills.map(skill => skill.skill).join(', ') : "No skills listed"}</span>
          </li>
        </ul>
      </div>
    );
  
    openModal(content);
  };
  

  return (
    <div className="user-row" onClick={handleClick}>
      <div className="user-info">
        <h6>{employeeName}</h6>
        <p>{role}</p>
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
}

export default UserRow;
