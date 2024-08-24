import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './TaskCard.css';
import TaskDisplayComponent from './../taskdisplay/TaskDisplayComponent';
import pin from '../../images/pin.png'
import dayjs from 'dayjs';

const TaskCard = ({ task, index ,openModal}) => {
    const { taskId, taskName, startDate, endDate, current_status, assignees } = task;
    const handleDoubleClick = () => {
        openModal(<TaskDisplayComponent taskid={taskId} />);
    };

    const userData = localStorage.getItem('user');
    const parsedUserData = userData ? JSON.parse(userData) : {};
    const loggedInEmployeeId = parsedUserData.employeeId;

    // Check if the logged-in employee is assigned to this task
    const isYourTask = assignees.some(assignee => assignee.employeeId === loggedInEmployeeId);

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const today = dayjs();
    const remainingDays = end.diff(today, 'day');

    const isOverdue = today.isAfter(end) && current_status !== "CLOSED";
    
    return (
        <Draggable draggableId={taskId.toString()} index={index}>
            {(provided) => (
                <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onDoubleClick={handleDoubleClick}
                >
                    <div className="card-body">
                        <div className="task-header">
                            <h6 className="card-title">{taskName}
                            {isYourTask && <span className="your-task-badge"><img className='pin-image' src={pin} alt="pin" /></span>}
                            {/* ★ */}
                            </h6>
                        </div>
                        {/* <div className="task-body">{description}</div> */}
                        <div className="task-footer">
                            <span className={`days-remaining ${isOverdue ? 'overdue' : ''}`}>
                                {isOverdue ? `Overdue by ${Math.abs(remainingDays)} days` : `${remainingDays} days remaining`}
                            </span>
                            <span>{assignees.length} assignees</span>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
