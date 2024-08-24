import React, { useState, useContext, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import { TopNav } from '../Navbar/TopNav';
import { userContext } from '../Context/UserContextComponent';
import { Analysis } from '../Analysis/Analysis';
import DisplayMessages from '../messages/DisplayMessages';
import UserForm from '../forms/UserForm';
import DisplayUser from '../DisplayUsers/DisplayUser';
import ProjectForm from '../forms/ProjectForm';
import DisplayProject from '../DisplayProject/DisplayProject';
import ClientForm from '../forms/ClientForm';
import DisplayClients from '../DisplayClients/DisplayClients';
import ProjectNavbar from '../projectnav/ProjectNavbar';
import ProjectCard from '../DisplayProject/ProjectCard';
import ClientRow from '../DisplayClients/ClientRow';
import AddTeamMember from '../addmember/AddTeamMember';
import CreateTaskForm from '../forms/CreateTaskForm';
import ProfileComponent from '../profile/ProfileComponent';
import TaskBoard from '../TaskComponent/TaskBoard';
import Modal from '../Modal/Modal';
import './Home.css';
import api from '../../config/api';
import MessageDashboard from "../views/MessageDashboard"

function AdminHome() {
  const { userDetail, projects } = useContext(userContext);
  const [show, setShow] = useState(false);
  const [navigateOptions, setNavigate] = useState("default");
  const [adminContext, setAdminContext] = useState("default");
  const [projectDetails, setProjectDetails] = useState("default");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [taskData, setTaskData] = useState([
    ["IN_QUEUE", 0],
    ["COMMENCED", 0],
    ["TESTING", 0],
    ["IN_REVIEW", 0],
    ["BLOCKED", 0],
    ["MERGED", 0],
    ["CLOSED", 0],
  ]);

  const [projectData, setProjectData] = useState([
    ["ON_HOLD", 0],
    ["IN_PROGRESS", 0],
    ["COMPLETED", 0],
  ]);
  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
};

  useEffect(() => {
    // Handle user details if needed in the effect
  }, [userDetail]);

  const toggleNavbar = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (projects !== undefined && Array.isArray(projects)) {
      console.log("Setting analysis panel");
      let updatedTaskData = [...taskData]; // Create a copy of taskData
      let updatedProjectData = [...projectData]; // Create a copy of projectData

      projects.forEach((project) => {
        // Fetch tasks for each project
        api
          .get(`/tasks/project/${project.projectId}`)
          .then((response) => {
            const tasks = response.data;
            console.log(tasks);
            tasks.forEach((task) => {
              updatedTaskData.forEach((td) => {
                if (td[0] === task.current_status) {
                  td[1] += 1;
                }
              });
            });
            setTaskData(updatedTaskData); // Update the state with new task data
          })
          .catch(() => {
            console.log("Error in fetching tasks");
          });

        // Update project data
        updatedProjectData.forEach((status) => {
          if (status[0] === project.projectStatus) {
            status[1] += 1;
          }
        });
      });

      setProjectData(updatedProjectData); // Update the state with new project data
    }
  }, [projects]);

  const taskTitle = "Task analysis";
  const projectTitle = "Project analysis";

  

  return (
    <div className="home">
      <div className="main">
        <Navbar show={show} setNavigate={setNavigate} toggleNavbar={toggleNavbar} adminContext={setAdminContext} />
        <div className={`no-expand ${show ? 'content' : ''}`}>
          <div className={`all-component-container ${show ? 'move' : ''}`}>
            <TopNav options={navigateOptions} adminContext={setAdminContext} projectDetails={setProjectDetails} />
            {adminContext === "default" || adminContext === "analysis" ? (
              <div>
                <Analysis title={taskTitle} data={taskData} pie={false} />
                <Analysis title={projectTitle} data={projectData} pie={true}/>
              </div>

            ) : adminContext === "messages" ? (
              <MessageDashboard/>
            ) : adminContext === "createUser" ? (
              <UserForm isUpdate={false} />
            ) : adminContext === "updateUser" ? (
              <UserForm isUpdate={true} /> 
            ) : adminContext === "viewUser" ? (
              <DisplayUser openModal={openModal} />
            ) : adminContext === "createProject" ? (
              <ProjectForm />
            ) : adminContext === "updateProject" ? (
              <ProjectForm isUpdate={true} />
            ) : adminContext === "viewProject" ? (
              <DisplayProject />
            ) : adminContext === "createClient" ? (
              <ClientForm isUpdate={false} />
            ) : adminContext === "updateClient" ? (
              <ClientForm isUpdate={true} />
            ) : adminContext === "viewClient" ? (
              <DisplayClients openModal={openModal}/>
            ) : adminContext === "profile" ? (
              <>
                <ProfileComponent/>
              </>
            ) : adminContext > -1 ? (
              <ProjectNavbar projectDetails={setProjectDetails} projectData={projects[adminContext]} />
            ) : adminContext==="user"?
            <>
                <DisplayUser openModal={openModal} />
            </>
            :adminContext==="client"?
            <>
                          <DisplayClients openModal={openModal}/> 
            </>:adminContext==="project"?
            <>
                          <DisplayProject />
            </>:adminContext==="viewUsers"?
            (
              <DisplayUser openModal={openModal} />
            )
              :
            (
              <></>
            )}
            <div id="project">
              {projectDetails === "task" && adminContext > -1 ? (<>
                <TaskBoard project={adminContext} openModal={openModal}/>
                </>
              ) : projectDetails === "details" ? (
                <>
                  <ProjectCard project={projects[adminContext]} />
                  {/* <br />
                  <br /> */}
                  <div className='client-display-component-home' style={{width:"50%",margin:"24px auto"}}>
                    <ClientRow client={projects[adminContext].client} openModal={openModal}/>
                  </div>
                </>
              ) : projectDetails === "team" ? (
                <>

                  {/* <h1>Team selected</h1> */}
                  <AddTeamMember project={projects[adminContext]} />
                </>
              ) : projectDetails === "createTask" ? (
                <>
                  <CreateTaskForm project={projects[adminContext]} update={setProjectDetails}/>
                </>
              ) :(
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />

      <div className={`${show ? 'content' : ''}`}>
        {/* <Copyright/> */}
      </div>
    </div>
  );
}

export default AdminHome;
