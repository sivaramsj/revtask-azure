import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLayerGroup, faCircleUser, faRightToBracket, faUsers, faClipboard, faProjectDiagram, faChartBar, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { userContext } from '../Context/UserContextComponent';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ show, toggleNavbar, setNavigate,adminContext}) => {
  const [activeLink, setActiveLink] = useState('');

  const { userDetail, setUserDetail, projects, setProjects } = useContext(userContext);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // const[displayProfile, setDisplayProfile] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);

  const navigate=useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const userOption = () => {
    setNavigate('user');
    adminContext("user");
  };

  const clientOption = () => {
    setNavigate('client');
    adminContext("client");
  };

  const projectOption = () => {
    setNavigate('project');
    adminContext("project");
  };

  const viewProjects = () => {
    setNavigate('viewProjects');
  };

  const statsOption=()=>{
    console.log("clicked stats option");
    adminContext("analysis");
  }

  const messageOption=()=>{
    adminContext("messages");
  }

  const viewUsers = () => {
    adminContext("viewUsers")
  }
  useEffect(()=>{

  } ,[userDetail])


  let options;
  if (userDetail.role === 'ADMIN') {
    options = [
      ['Users', faUsers, userOption],
      ['Clients', faClipboard, clientOption],
      ['Projects', faProjectDiagram, projectOption],
      ["statistics",faChartBar,statsOption],
      ['messages',faEnvelope,messageOption]
    ];
  } else {
    options = [
      ['View Projects', faProjectDiagram, viewProjects],
      ["statistics",faChartBar,statsOption],
      ['Users', faUsers, viewUsers],
      ['messages',faEnvelope,messageOption]
    ];
  }

  const logoutClicked=()=>{
      localStorage.removeItem("user");
      navigate("/login");  
    }

  const setProfile=()=>{
    // if(displayProfile){
    //   adminContext("analysis")
    //   setDisplayProfile(false)
    // }
    // else{
    //   adminContext("profile")
    //   setDisplayProfile(true)
    // }
     if (!isProfileActive) {
            adminContext("profile"); // Show profile first
        } else {
            adminContext("analysis"); // Then toggle to analysis
        }
    setIsProfileActive(!isProfileActive); 
  }

  return (
    <>
      <header className={`header ${show ? 'body-pd' : ''}`} id="header">
        <div className="header_toggle" onClick={toggleNavbar}>
          <FontAwesomeIcon icon={faBars} id="header-toggle" />
        </div>
        <div className="current-time">
          <FontAwesomeIcon icon={faClock} className="clock-icon" />
          {currentTime}
        </div>
        <div className="profile" style={{cursor:"pointer"}} onClick={setProfile}>
          <div className="header_img" >
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          <p className="profile-name" style={{color: "#5d7285"}}>{userDetail.employeeName}</p>
        </div>
      </header>
      <div className={`l-navbar ${show ? 'show' : ''}`} id="nav-bar">
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <FontAwesomeIcon icon={faLayerGroup} className="nav_logo-icon" />
              <span className="nav_logo-name">RevTask</span>
            </a>
            <div className="nav_list">
              {options.map((feature, idx) => (
                <a
                  href="#"
                  className={`nav_link`}
                  key={idx}
                  onClick={() => feature[2]()}
                >
                  <FontAwesomeIcon icon={feature[1]} className="nav_icon" />
                  <span className="nav_name">{feature[0]}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="nav_link" style={{cursor:"pointer"}} onClick={logoutClicked}>
            <FontAwesomeIcon icon={faRightToBracket} className="fa-rotate-180 nav_icon" />
            <span className="nav_name">SignOut</span>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
