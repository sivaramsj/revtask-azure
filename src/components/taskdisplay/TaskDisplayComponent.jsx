import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import ResetButton from '../buttons/ResetButton';
import './TaskDisplayComponent.css';
import { userContext } from '../Context/UserContextComponent';
import { useContext } from 'react';

// Sample employee data


const TaskDisplayComponent = ({taskid}) => {
    const [task, setTask] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedStartDate, setEditedStartDate] = useState('');
    const [editedEndDate, setEditedEndDate] = useState('');
    const [timeline, setTimeline] = useState([]);
    const { userDetail, setUserDetail, projects, setProjects } = useContext(userContext);


    useEffect(() => {
        // Fetch task data from API
        api.get(`/tasks/${taskid}`)
            .then(response => {
                const taskData = response.data;
                setTask(taskData);
                setEditedDescription(taskData.description);
                setEditedStartDate(taskData.startDate.split('T')[0]); // Format date to yyyy-mm-dd
                setEditedEndDate(taskData.endDate.split('T')[0]); // Format date to yyyy-mm-dd
            })
            .catch(error => console.error('Error fetching task:', error));

        // Fetch comments from API
        api.get(`/comments/task/${taskid}`)
            .then(response => {
                // Ensure comments are set as an array
                setComments(Array.isArray(response.data.data) ? response.data.data : []);
            })
            .catch(error => console.error('Error fetching comments:', error));

        // Fetch timeline data from API
        api.get(`/timelines/task/${taskid}`)
            .then(response => {
                // Ensure timeline data is set as an array
                console.log(response.data.data);
                setTimeline(response.data.data);
                
            })
            .catch(error => console.error('Error fetching timeline:', error));
    }, []);


    const addComment = () => {
        if (newComment.trim() !== '') {
            // Example of employeeId for demonstration
            // const exampleEmployeeId = 5; // You might get this dynamically based on the logged-in user

            const newCommentData = {
                comment: newComment,
                timestamp: new Date().toISOString(),
                type: 'user',
                user: { employeeId: userDetail.employeeId },
                task: { taskId: task.taskId }
            };

            // Add comment to the comments array
            setComments([...comments, newCommentData]);

            // Optionally, send this new comment to the backend API
            api.post('/comments', newCommentData);
            setNewComment('');
        }
    };

    // const getEmployeeName = (employeeId) => {
    //     const employee = employees.find(emp => emp.employeeId === employeeId);
    //     return employee ? employee.employeeName : 'Unknown';
    // };

    const deleteTask = () => {
        console.log(taskid);
        api.delete(`/tasks/${task.taskId}`)
            .then(() => {
                alert('Task Deleted');
                setTask({});
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const toggleEdit = () => {
        if (isEditing) {
            const updatedTask = {
                ...task,
                description: editedDescription,
                startDate: editedStartDate,
                endDate: editedEndDate
            };
            api.put(`/tasks/${task.taskId}`, updatedTask)
                .then(response => setTask(response.data))
                .catch(error => console.error('Error updating task:', error));
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="task-container">
            <div className="task-header hr-line">
                <h3>{task.taskName}</h3>
            </div>
            <div className="task-details">
                <label>Description</label>
                {isEditing ? (
                    <textarea
                        className="edit-description"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    <p className='hr-line'>{task.description}</p>
                )}
                <div className="date-edit-section hr-line">
                    <div className="date-container">
                        <label>Start Date</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={editedStartDate}
                                onChange={(e) => setEditedStartDate(e.target.value)}
                            />
                        ) : (
                            <p>{new Date(task.startDate).toLocaleDateString()}</p>
                        )}
                    </div>
                    <div className="date-container hr-line">
                        <label>End Date</label>
                        {isEditing ? (
                            <input
                                type="date"
                                value={editedEndDate}
                                onChange={(e) => setEditedEndDate(e.target.value)}
                            />
                        ) : (
                            <p>{new Date(task.endDate).toLocaleDateString()}</p>
                        )}
                    </div>
                    <div className="edit-button-container">
                        <ResetButton onClick={toggleEdit} value={isEditing ? "Save" : "Edit"} />
                    </div>
                </div>
            </div>

            <div className="comments-section hr-line">
                <label>Comments</label>
                <div className="comment-input-container">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="comment-input"
                        placeholder="Write a comment..."
                    />
                    <ResetButton onClick={addComment} value="Add" />
                </div>
                <ul className="comment-list">
                    {comments.map((comment, index) => (
                        <li key={index} className="comment-item">
                            {/* <strong>{getEmployeeName(comment.user.employeeId)}:</strong> {comment.comment} */}
                            <strong>{comment.user.employeeName}:</strong> {comment.comment}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="timeline-section">
                <label>Timeline</label>
                <ul className="timeline-list">
                    {timeline.map((event) => (
                        <li key={event.timelineId} className="timeline-item">                            
                            <strong>{event.milestone}</strong> - {new Date(event.timestamp).toLocaleString()} - {event.employeeName}
                        </li>  
                    ))}
                </ul>
            </div>
            {
                userDetail.role==="MANAGER"?(
                    <div className="delete-task-button">
                    <ResetButton onClick={deleteTask} value="Delete Task" />
                </div>
                )
                :
                <></>
            }
          
        </div>
    );
};

export default TaskDisplayComponent;
