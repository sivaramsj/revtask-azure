import React from 'react'
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import Copyright from '../Footer/Copyright';
// import DisplayProject from '../DisplayProject/DisplayProject'
import LoginPage from '../loginpage/LoginPage';
import DisplayProject from '../DisplayProject/DisplayProject';
import DisplayUser from '../DisplayUsers/DisplayUser';
import DisplayClients from '../DisplayClients/DisplayClients';
import TaskBoard from '../TaskComponent/TaskBoard';
import './Home.css'


function Home() {
    // const type="USER"
    const [show, setShow] = useState(false);

    const toggleNavbar = () => {
      setShow(!show);
    };
    
    return (   
      <>
        <div className="home">
            <Navbar show={show} toggleNavbar={toggleNavbar}/>
            <div className={`all-main-component no-expand ${show ? 'content' : ''}`}>
              
              <div className={`all-component-container ${show ? 'move' : ''}`}>
                <TaskBoard/>
              </div>
              
            </div>
        </div>

        <div className={`${show ? 'content' : ''}`}>
          <Copyright/>
        </div>
      </>     
      
      
    );
}

export default Home