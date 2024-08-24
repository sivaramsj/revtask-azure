import React, { useState } from 'react'
import { userContext } from '../Context/UserContextComponent';
import { useContext } from 'react';

export const TopNav = ({options,project,adminContext,projectDetails}) => {
  const { userDetail, setUserDetail, projects, setProjects} = useContext(userContext);
  let count=0;

  // Data from context
 
  // Data from context
  
  return (
    <div>
    <nav className="top-nav navbar bg-body-tertiary">
  <form className="container-fluid justify-content-start">
    {/* {console.log(options)} */}
    {options=="user"?(
        <>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("createUser")}}>Create User</button>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("updateUser")}}>Update User</button>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("viewUser")}}>View Users</button>
        </>
    ):options=="project"?
    (
        <>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("createProject")}}>Create Project</button>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("updateProject")}}>Update Project</button>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("viewProject")}}>View Projects</button>
        </>
    ):options=="client"?(
        <>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("createClient")}}>Create Client</button>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("updateClient")}}>Update Client</button>
            <button className="btn btn-outline-success me-2" type="button" onClick={()=>{adminContext("viewClient")}}>View Clients</button>
        </>
    )
    :options=="viewProjects"?(
      <>
  {projects.map((data, index) => {
    return (
        <button
            key={index}
            className="btn btn-outline-warning me-2"
            type="button"
            onClick={() =>{ 
              adminContext(index)
              projectDetails("task")
            }}
        >
            {data.projectName}
        </button>
    );
})}

      </>
    ):(
      <p>Welcome to Rev Task Management System</p>
    )
}
  </form>
</nav>
    </div>
  )
}
