import React, { useState } from 'react';
import './ForgotPage1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../../images/forgot-password-image.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../../config/api';

const ForgotPage = () => {
    const [otp, saveOTP] = useState("");
    const [email, setEmail] = useState("");
    const [userOTP, setUserOTP] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const navigate = useNavigate();
    const [otpTrue, setOTP] = useState(true);

    const sendOTP = (e) => {
        e.preventDefault();
        if (email === "") {
            showError("Please enter email address", "success");
        } else {
            api.get(`/employee/otp?email=${email}`)
                .then((response) => {
                    saveOTP(response.data.data);
                    showError("Check your email for OTP", "success");
                })
                .catch((error) => {
                    showError("Enter valid email", "success");
                });
        }
    };

    const verifyOTP = (e) => {
        e.preventDefault();
        if (otp === "") {
            alert("Send OTP before verifying");
        } else if (userOTP === "") {
            showError("Enter the OTP before resetting password", "success");
        } else if (otp === userOTP) {
            setOTP(false);
        } else {
            alert(`Incorrect OTP: ${otp} : ${userOTP}`);
        }
    };

    const resetPassword = (e) => {
        e.preventDefault();
        if (password === "") {
            showError("Please enter a new password", "resetCheck");
        } else if (password !== cpassword) {
            showError("Password and confirm password do not match", "resetCheck");
        } else {
            api.put(`/employee/reset?email=${email}&password=${password}`)
                .then(() => {
                    navigate("/login");
                })
                .catch(() => {
                    showError("Error resetting password. Check your email or OTP.", "resetCheck");
                });
        }
    };

    const showError = (message, id) => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = "block";
            element.innerHTML = message;
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="forgot-password-image">
                    <img src={image} alt="Forgot Password" />
                </div>
                <div className="forgot-password-form">
                    <div className="forgot-password-form-container">
                        <h2 className='forget-page-title'>Reset Password</h2>
                        <form>
                            {
                                otpTrue ?
                                    <>  
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                name='email'
                                                className="form-control"
                                                placeholder="Enter email"
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <button className='btn btn-primary' onClick={sendOTP}>Send OTP</button>
                                        </div>
                                        <div className="form-group">
                                            <span id="success" style={{ color: "red", display: "none" }}>Check Email for OTP</span>
                                            <input
                                                type="text"
                                                value={userOTP}
                                                onChange={(e) => setUserOTP(e.target.value)}
                                                name='otp'
                                                className="form-control"
                                                placeholder="Enter OTP"
                                                required
                                            />
                                        </div>
                                        <Link to="/login">login</Link>
                                        <div className='form-group'>
                                            <button className='btn btn-primary forget-button' onClick={verifyOTP}>Verify</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="form-group">
                                            <span id="resetCheck" style={{ color: "red", display: "none" }}></span>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                name='password'
                                                className="form-control"
                                                placeholder="New password"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                value={cpassword}
                                                onChange={(e) => setCPassword(e.target.value)}
                                                name='cpassword'
                                                className="form-control"
                                                placeholder="Confirm password"
                                                required
                                            />
                                        </div>
                                        <Link to="/login">login</Link>

                                        <button className='btn btn-primary forget-button' onClick={resetPassword}>Reset</button>
                                    </>
                                    
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPage;
