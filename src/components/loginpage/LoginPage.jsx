import React, { useContext, useState } from 'react'
import login from '../../images/Mobile login-amico.png'
import { userContext } from '../Context/UserContextComponent';
import "./LoginPage.css"
import api from '../../config/api';
import { json, Link,useNavigate} from 'react-router-dom';
function LoginPage({onLogin}) {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
        e.preventDefault();
            const response = api.get(`/employee/login?email=${email}&password=${password}`).then((response)=>{
                if(response.data.status==202){
                    console.log("Login successful");
                    localStorage.setItem("user",JSON.stringify(response.data.data));
                    onLogin();
                    navigate("/home")
                }
                else{
                alert("In valid credentials: "+localStorage.data.status)
                }
            })
            .catch((err)=>{
                alert("In valid credentials from error")
                console.log(err.response.data);
                
            })
            // console.log(userData);
            
            
            // localStorage.setItem(data,us)
            // setUserDetail(userData);
            // fetchProjects(userData);
            // navigate("/home")
        
        setEmail("");
        setPassword("");
    }

    

    return (

        <div className="login-container">
            <div className="illustration">
                <img src={login} alt="Login Illustration" />
            </div>
            <div className="login-form">
                <h2>Welcome back</h2>
                <p>Welcome back! Please enter your details.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <div className="form-group terms">
                      
                        <Link to="/reset" className='forgot-password'>Forgot Password</Link>
                    </div>
                    <button type="submit" className="login-button">Log in</button>
                </form>
            </div>
        </div>
        
    )
}

export default LoginPage