import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../config/api';
import './Form.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserForm = ({ isUpdate = false }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    role: '',
    email: '',
    phone: '',
    dateOfJoining: '',
    description: '',
    status: 'ACTIVE',
    skills: [],
  });

  const [otherSkill, setOtherSkill] = useState('');
  const [showOtherSkillInput, setShowOtherSkillInput] = useState(false);

  const [skillDescription, setSkillDescription] = useState('');

  const [skillsOptions, setSkillsOptions] = useState([]);

  const [searchName, setSearchName] = useState('');
  const [isEmployeeFound, setIsEmployeeFound] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skill/allSkills');
        setSkillsOptions(response.data.data); // Assuming the API returns an array of skill strings
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, [setSkillsOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSkillSelect = (skill) => {
    if (skill === 'Others') {
      setShowOtherSkillInput(true);
    } else {
      setFormData((prevState) => {
        const newSkills = prevState.skills.map(s => s.skill); 
        const updatedSkills = newSkills.includes(skill)
          ? newSkills.filter(s => s !== skill)
          : [...newSkills, skill];
        return {
          ...prevState,
          skills: updatedSkills.map(s => ({ skill: s })) 
        };
      });
      setShowOtherSkillInput(false);
    }
  };
  

 
  
  
  
  const handleOtherSkillSubmit = async () => {
    if (otherSkill && skillDescription) {
      try {
        const existingSkill = skillsOptions.find(skillObj => skillObj.skill === otherSkill);
        
        if (!existingSkill) {
          await api.post('/skill', {
            skill: otherSkill,
            description: skillDescription,
          });
  
          setSkillsOptions(prevSkills => [
            ...prevSkills,
            { skill: otherSkill, description: skillDescription }
          ]);
        }
  
        setFormData(prevState => ({
          ...prevState,
          skills: [...prevState.skills, { skill: otherSkill }]
        }));
  
        setOtherSkill('');
        setSkillDescription('');
        setShowOtherSkillInput(false);
      } catch (error) {
        console.error('Error adding new skill:', error);
        alert('Error adding new skill');
      }
    }
  };
  
 
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/employee/name?name=${searchName}`);
      if (response.data.data) {
        const employee = response.data.data;
        const formattedDateOfJoining = employee.dateOfJoining.split('T')[0];
        setFormData({
          employeeId: employee.employeeId,
          employeeName: employee.employeeName,
          role: employee.role,
          email: employee.email,
          phone: employee.phone,
          dateOfJoining: formattedDateOfJoining,
          description: employee.description,
          status: employee.status,
          skills: employee.skills,
        });
        setIsEmployeeFound(true);
      } else {
        alert('No such employee found');
        setIsEmployeeFound(false);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert('Error fetching employee data');
      setIsEmployeeFound(false);
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate && isEmployeeFound) {
        await api.put('/employee', {
          ...formData,
          skills: formData.skills.map(s => ({ skill: s.skill })) 
        });
        toast.success("employee updated successfully");
      } else {
        await api.post('/employee', {
          ...formData,
          skills: formData.skills.map(s => ({ skill: s.skill }))
        });
        toast.success("employee created successfully");
      }
  
      setFormData({
        employeeId: '',
        employeeName: '',
        role: '',
        email: '',
        phone: '',
        dateOfJoining: '',
        description: '',
        status: 'ACTIVE',
        skills: [],
      });
      setSearchName('');
      setIsEmployeeFound(false);
    } catch (error) {
      console.error('Error creating/updating employee:', error);
    }
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="form">
            <h2>{isUpdate ? 'Update Employee' : 'Create Employee'}</h2>
            {isUpdate && (
              <div className="search-section">
                <input
                  type="text"
                  placeholder="Enter Employee Name to Search ..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(e);
                    }
                  }}
                  style={{ marginTop: 0, marginBottom: 0 }}
                />
                <button onClick={handleSearch} className="btn btn-primary">Search</button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="employeeName" className="form-label">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isEmployeeFound}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isEmployeeFound}
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ASSOCIATE">Associate</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isEmployeeFound}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isEmployeeFound}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  required
                  disabled={isUpdate && !isEmployeeFound}
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
                  disabled={isUpdate && !isEmployeeFound}
                ></textarea>
              </div>
              {isUpdate && isEmployeeFound && (
                <div className="form-group">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="skills" className="form-label">Skills</label>
                <select
                  id="skills"
                  className="form-control"
                  onChange={(e) => handleSkillSelect(e.target.value)}
                  value=""
                  disabled={isUpdate && !isEmployeeFound}
                >
                  <option key={-1} value="">Select Skills</option>
                  {skillsOptions.map((skill,index) => (
                    <option key={index} value={skill.skill}>
                      {skill.skill}
                    </option>
                  ))}
                  <option key={skillsOptions.length} value="Others">Others</option>
                </select>
                <div className="mt-2">
                  {formData.skills.length > 0 && (
                    <div>
                      <strong>Selected Skills:</strong>
                      <ul>
                        {formData.skills.map(skillObj => (
                          <li key={skillObj.skill}>{skillObj.skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {showOtherSkillInput && (
                  <div className="other-skill-container">
                    <input
                      type="text"
                      className="form-control"
                      id="otherSkill"
                      name="otherSkill"
                      placeholder="skill"
                      value={otherSkill}
                      onChange={(e) => setOtherSkill(e.target.value)}
                      disabled={isUpdate && !isEmployeeFound}
                    />
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="skillDescription"
                      name="skillDescription"
                      placeholder="description"
                      value={skillDescription}
                      onChange={(e) => setSkillDescription(e.target.value)}
                      disabled={isUpdate && !isEmployeeFound}
                    />
                    <button
                      type="button"
                      className="btn btn-primary add-button mt-2"
                      onClick={handleOtherSkillSubmit}
                      disabled={isUpdate && !isEmployeeFound}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ width: '50%' }}
                  disabled={isUpdate && !isEmployeeFound}
                >
                  {isUpdate ? 'Update Employee' : 'Create Employee'}
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

export default UserForm;
