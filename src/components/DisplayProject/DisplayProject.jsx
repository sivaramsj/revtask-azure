import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import './DisplayProject.css'
import api from '../../config/api';

function DisplayProject() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data.data); 
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []); 

    return (
        <div className='project-display-component'>
            <div className="projects-grid">
                {Array.isArray(projects) && projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectCard key={project.projectId} project={project} />
                    ))
                ) : (
                    <p> Loading... </p>
                )}
            </div>
        </div>
    );
}

export default DisplayProject;
