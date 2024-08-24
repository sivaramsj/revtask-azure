import React from 'react';
import './ProjectCard.css'; 


function ProjectCard({project}) {
    const { projectName, description, team, projectStatus ,startDate,endDate} = project;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return (
        <div className="project-card">
            <div className="project-header">
                <h3>{projectName}</h3>
                <span className={`status ${projectStatus.toLowerCase()}`}>{projectStatus}</span>
            </div>
            <p className="project-description">{description}</p>
            <div className="project-footer">
                <span>{team.length} members</span>
                <span>{daysRemaining} days</span>
            </div>
      </div>
    );
}

export default ProjectCard;
