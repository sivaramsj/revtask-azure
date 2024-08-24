import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'; 

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProjectForm = ({ isUpdate = false }) => {
  const [formData, setFormData] = useState({
    projectId: '',
    projectName: '',
    description: '',
    startDate: '',
    endDate: '',
    projectStatus: 'IN_PROGRESS',
    client: {
      clientId: ''
    }
  });

  const [searchName, setSearchName] = useState('');
  const [isProjectFound, setIsProjectFound] = useState(false);
  const [clients, setClients] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');
  const [existingTeamMembers, setExistingTeamMembers] = useState([]);


  useEffect(() => {
    const fetchClientsAndManagers = async () => {
      try {
        const clientsResponse = await api.get('/clients');
        setClients(clientsResponse.data.data);

        const employeesResponse = await api.get('/employee');
        const managersData = employeesResponse.data.data.filter(employee => employee.role === 'MANAGER'); 
        setManagers(managersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClientsAndManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClientChange = (e) => {
    setFormData({
      ...formData,
      client: {
        clientId: e.target.value
      }
    });
  };

  const handleManagerChange = (e) => {
    setSelectedManager(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log('Searching');
      const response = await api.get(`/projects/name?name=${searchName}`);
      if (response.data.data) {
        const project = response.data.data;

        const formattedStartDate = project.startDate.split('T')[0];
        const formattedEndDate = project.endDate.split('T')[0];
        setFormData({
          projectId: project.projectId,
          projectName: project.projectName,
          description: project.description,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          projectStatus: project.projectStatus,
          client: {
            clientId: project.client.clientId
          }
        });
        setSelectedManager(project.team.find(member => member.role === 'MANAGER')?.employeeId || ''); 
        setExistingTeamMembers(project.team.filter(member => member.role === 'ASSOCIATE')); 
        setIsProjectFound(true);
      } else {
        alert('No such project found');
        setIsProjectFound(false);
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
      alert('Error fetching project data');
      setIsProjectFound(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        team: [
          {
            employeeId: selectedManager,
          },
          ...existingTeamMembers.map(member => ({ employeeId: member.employeeId }))
        ]
      };

      if (isUpdate && isProjectFound) {
        await api.put(`/projects/${formData.projectId}`, projectData);
        toast.success("project updated successfully")
      } else {
        await api.post('/projects', projectData);
        toast.success("project created successfully")
      }

      setFormData({
        projectId: '', 
        projectName: '',
        description: '',
        startDate: '',
        endDate: '',
        projectStatus: 'IN_PROGRESS',
        client: {
          clientId: ''
        }
      });
      setSelectedManager('');
      setSearchName('');
      setIsProjectFound(false);
      setExistingTeamMembers([]);
    } catch (error) {
      console.error('Error creating/updating project:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="form">
            <h2>{isUpdate ? 'Update Project' : 'Create Project'}</h2>
            {isUpdate && (
              <div className="search-section">
                <input
                  type="text"
                  placeholder="Enter Project Name to Search ..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                  style={{marginTop:0,marginBottom:0}}
                />
                <button onClick={handleSearch} className="btn btn-primary">Search</button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="projectName" className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isProjectFound}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isProjectFound}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isProjectFound}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isProjectFound}
                />
              </div>
              
              {isUpdate && isProjectFound && (
                <div className="form-group">
                  <label htmlFor="projectStatus" className="form-label">Project Status</label>
                  <select
                    className="form-control"
                    id="projectStatus"
                    name="projectStatus"
                    value={formData.projectStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On Hold</option>
                  </select>
                </div>
               )}

              <div className="form-group">
                <label htmlFor="client" className="form-label">Client</label>
                <select
                  className="form-control"
                  id="client"
                  name="client"
                  value={formData.client.clientId}
                  onChange={handleClientChange}
                  required
                  disabled={isUpdate && !isProjectFound}
                >
                  <option value="">Select a client</option>
                  {clients.map((client) => (
                    <option key={client.clientId} value={client.clientId}>
                      {client.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="manager" className="form-label">Manager</label>
                <select
                  className="form-control"
                  id="manager"
                  name="manager"
                  value={selectedManager}
                  onChange={handleManagerChange}
                  required
                  disabled={isUpdate && !isProjectFound}
                >
                  <option value="">Select a manager</option>
                  {managers.map((manager) => (
                    <option key={manager.employeeId} value={manager.employeeId}>
                      {manager.employeeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ width: '50%' }}
                  disabled={isUpdate && !isProjectFound}
                >
                  {isUpdate ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProjectForm;
