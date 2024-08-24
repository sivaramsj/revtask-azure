import React, {useContext } from 'react';
import ResetButton from '../buttons/ResetButton';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './ProjectNavbar1.css';
import { userContext } from '../Context/UserContextComponent';

const ProjectNavbar = ({ projectDetails, projectData }) => {
  const { userDetail, setUserDetail, projects, setProjects } = useContext(userContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <a className="navbar-brand d-flex align-items-center" href="#home">
        <span className="mx-3">{projectData.projectName}</span>
      </a>
      <div className="navbar-nav mx-2">
        <ResetButton value="Details" onClick={() => projectDetails(prev => prev === "details" ? "default" : "details")}/>
      </div>
      {userDetail.role=="MANAGER"?<button className='btn btn-success' onClick={() => projectDetails(prev => prev === "createTask" ? "default" : "createTask")} >Create Task</button>:<></>}

      <div className="navbar-nav ms-auto d-flex align-items-center">
        <span className="me-2">Team Members: {projectData.team.length}</span>
        <button className="btn btn-primary" onClick={() => projectDetails(prev => prev === "team" ? "default" : "team")}>+</button>
      </div>
    </nav>
  );
};

export default ProjectNavbar;
