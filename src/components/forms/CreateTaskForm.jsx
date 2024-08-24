import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'; // Import your custom CSS

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ project,update }) => {
  const [formData, setFormData] = useState({
    projectId: project.projectId,
    taskName: '',
    description: '',
    startDate: '',
    endDate: '',
    current_status:'IN_QUEUE',
    assignees: []
  });
  let allUsers = project.team;

  useEffect(()=>{
    api.get(`/projects/${project.projectId}`)
    .then((response)=>{
      allUsers=response.data.data.team; 
    })
    .catch((err)=>{
      alert("Error getting project")
    })
  },[])

  console.log(allUsers);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAssigneeChange = (e) => {
    const { options } = e.target;
    const selectedAssignees = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedAssignees.push({ employeeId: options[i].value });
      }
    }
    setFormData({
      ...formData,
      assignees: selectedAssignees
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      taskName: formData.taskName,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      timestamp: new Date().toISOString(),
      current_status: 'IN_QUEUE',
      project: {
        projectId: formData.projectId
      },
      assignees: formData.assignees
    };
    console.log(taskData);

    api.post(`/tasks`,taskData)
    .then((response)=>{
      console.log(response);
      toast.success("task created successfully")
      console.log(response.data);
      if (response.status === 201) {
      update("task")

      } else {
        
       

      }
    })
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="form">
            <h2>Create Task</h2>
            <span id='taskCreation'></span>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Task Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignees">Assignees</label>
                <select
                  multiple
                  className="form-control"
                  id="assignees"
                  name="assignees"
                  onChange={handleAssigneeChange}
                >
                  {allUsers.map(user => (
                    <option key={user.employeeId} value={user.employeeId}>
                      {user.employeeName}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Create Task</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default TaskForm;