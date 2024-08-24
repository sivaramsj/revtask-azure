import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import './ProfileComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);

    
        api.get(`/profile`, {
            params: { email: userData.email },
            responseType: 'arraybuffer'
        })
        .then(response => {
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            setImage(URL.createObjectURL(blob));
        })
        .catch(error => {
            console.error("Error fetching profile image:", error);
        });
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setUploadedImage(fileURL); // Immediate preview
            setImageName(file.name);

            const formData = new FormData();
            formData.append('email', user.email);
            formData.append('file', file);

            api.post('/profile', formData)
                .then(response => {
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    setImage(URL.createObjectURL(blob)); // Set the image from server response
                })
                .catch(error => {
                    console.error("Error uploading profile image:", error);
                });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/login")
    };

    const handleResetPassword = () => {
        navigate("/reset")
    };

    if (!user) return null;

    return (
        <div className="profile-component-conatiner">
            <div className="profile-container">
           
                <div className="profile-image-section">
                    {uploadedImage || image ? (
                        <img
                            src={uploadedImage || image}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" style={{width: "150px",height: "150px",color:"#5d7285",marginBottom:"16px"}}/>
                    )}
                    <label className="upload-button">
                        Upload Profile
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }} // Hide the actual input
                        />
                    </label>
                    {imageName && <p className="image-name">{imageName}</p>}
                </div>
                <div className="profile-info">
                    <div className="profile-detail">
                        <strong>Name:</strong> <span>{user.employeeName}</span>
                    </div>

                    <div className="profile-detail">
                        <strong>Role:</strong> <span>{user.role}</span>
                    </div>

                    <div className="profile-detail">
                        <strong>Description:</strong> <span>{user.description}</span>
                    </div>

                    <div className="profile-detail">
                        <strong>Phone:</strong> <span>{user.phone}</span>
                    </div>

                    <div className="profile-detail">
                        <strong>Email:</strong> <span>{user.email}</span>
                    </div>

                    <div className="profile-detail">
                        <strong>Status:</strong> <span>{user.status}</span>
                    </div>
                    {/* {user.skills && user.skills.map(skill => (
                        // <p key={skill.skillId}>{skill.skill} - {skill.description}</p>
                        <p key={skill.skillId}>{skill.skill}</p>
                    ))} */}

                    <div className="profile-detail">
                        <strong>Skills:</strong>
                    </div>

                    <div className="skills-container">
                        {user.skills && user.skills.map(skill => (
                            <span key={skill.skillId} className="skill-badge">
                                {skill.skill}
                            </span>
                        ))}
                    </div>

                    <div className="profile-actions">
                        <button onClick={handleResetPassword} className="reset-button">Reset Password</button>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
};

export default ProfileComponent;
