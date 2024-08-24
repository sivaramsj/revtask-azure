import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage';
import LoginPage from './components/loginpage/LoginPage';
import ForgotPage from './components/forgotpasswordpage/ForgotPage';
import AdminHome from './components/HomePage/AdminHome';
import { UserContextComponent } from './components/Context/UserContextComponent';
import './components/messages/MessageStyles.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    if("user" in localStorage){
      setIsLoggedIn(true);
    }
  },[])
  

  return (
    <Router>
      <Routes>
        (!isLoggedIn ?(
        <Route path='/' exact element={<LandingPage />} />
        <Route path='/login' exact element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path='/reset' exact element={<ForgotPage />} />):
        (
          
          <Route
            path='/home'
            exact
            element={ isLoggedIn ? (
              <UserContextComponent>
                <AdminHome />
              </UserContextComponent>
            ):
            (<LandingPage></LandingPage>)
            }
          />
        
        )
        )
      </Routes>
    </Router>
  );
}

export default App;