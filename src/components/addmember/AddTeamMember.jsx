// src/components/addmember/AddTeamMember.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddTeamMember.css';
import { userContext } from '../Context/UserContextComponent';
import { useContext } from 'react';
import api from '../../config/api';

const AddTeamMember = ({ project }) => {
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [message, setMessage] = useState('');
    const { userDetail, projects } = useContext(userContext);

    // Fetch existing project members on component mount
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get(`/projects/${project.projectId}`);
                if (response.status === 200) {
                    setMembers(response.data.data.team || []);
                } else {
                    console.error('Error fetching project members:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching project members:', error);
            }
        };

        fetchMembers();
    }, []);

    // Search for employees by name
    const handleSearch = async (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.trim() === '') {
            setSearchResult(null);
            return;
        }

        try {
            const response = await api.get('/employee/name', {
                params: { name: e.target.value },
            });

            if (response.status === 200) {
                setSearchResult(response.data.data || 'No employee found with this name.');
            } else {
                setSearchResult('No employee found with this name.');
            }
        } catch (error) {
            console.error('Error searching employees:', error);
            setSearchResult('Not Found.');
        }
    };

    // Add employee to project
    const handleAddMember = async () => {
        if (!searchResult || typeof searchResult === 'string') {
            setMessage('No employee selected to add.');
            return;
        }
    
        try {
            const response = await api.post('/projects/add', null, {
                params: {
                    project_id: project.projectId, // Ensure this matches with backend
                    employee_id: searchResult.employeeId // Ensure this matches with backend
                }
            });
    
            if (response.status === 200) {
                setMembers([...members, searchResult]);
                setMessage('Member added successfully!');
                setSearchQuery('');
                setSearchResult(null);
            } else {
                console.error('Error adding member to project:', response.statusText);
                setMessage('Failed to add member.');
            }
        } catch (error) {
            console.error('Error adding member to project:', error);
            setMessage('Failed to add member.');
        }
    };
    

    // Remove employee from project
    const handleDeleteMember = async (employeeId) => {
        try {
            // Assuming project.id and employeeId are correct
            const response = await api.delete('/projects/team', {
                params: {
                    project_id: project.projectId,  // Adjust if the backend expects 'project_id'
                    employee_id: employeeId  // Adjust if the backend expects 'employee_id'
                }
            });
    
            if (response.status === 200) {
                setMembers(members.filter(member => member.employeeId !== employeeId));
                setMessage('Member deleted successfully!');
            } else {
                console.error('Error deleting member from project:', response.statusText);
                setMessage('Failed to delete member.');
            }
        } catch (error) {
            console.error('Error deleting member from project:', error);
            setMessage('Failed to delete member.');
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Project Team Members</h3>
            {message && <div className="alert alert-info">{message}</div>}

            <ul className="list-group mb-4">
                {members.length > 0 ? (
                    members.map(member => (
                        <li key={member.employeeId} className="list-group-item d-flex justify-content-between align-items-center">
                            {member.employeeName}
                            {userDetail.role==="MANAGER"?
                             <button
                             type="button"
                             className="btn btn-primary"
                             onClick={() => handleDeleteMember(member.employeeId)}
                         >
                             Delete
                         </button>
                            :<></>}
                           
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No members assigned to this project.</li>
                )}
            </ul>
            {userDetail.role==="MANAGER"?
            <div className="add-member-form card p-4">
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for an employee"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            {typeof searchResult === 'string' ? (
                <div className="alert alert-warning">{searchResult}</div>
            ) : (
                searchResult && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>{searchResult.employeeName}</span>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddMember} // This is the Add button
                        >
                            Add
                        </button>
                    </div>
                )
            )}
        </div>
            :<></>}
            
        </div>
    );
};

export default AddTeamMember;
