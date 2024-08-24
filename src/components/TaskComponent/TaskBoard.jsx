import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { userContext } from '../Context/UserContextComponent';
import { useContext } from 'react';
import Column from './Column';
import './TaskBoard.css';
import api from '../../config/api';


const MILESTONES = {
    IN_QUEUE: 'In Queue',
    COMMENCED: 'Commenced',
    TESTING: 'Testing',
    IN_REVIEW: 'In Review',
    BLOCKED: 'Blocked',
    MERGED: 'Merged',
    CLOSED: 'Closed'
};

const TaskBoard = ({ project ,openModal}) => {
    const { userDetail, setUserDetail, projects, setProjects } = useContext(userContext);
    const [columns, setColumns] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get(`/tasks/project/${projects[project].projectId}`);
                const data = await response.data;
                console.log('Fetched tasks:', data); 
                
                // Set tasks in state
                setTasks(data);

                // Categorize tasks
                const categorizedTasks = {
                    IN_QUEUE: [],
                    COMMENCED: [],
                    TESTING: [],
                    IN_REVIEW: [],
                    BLOCKED: [],
                    MERGED: [],
                    CLOSED: []
                };

                data.forEach(task => {
                    const status = task.current_status;
                    if (categorizedTasks[status]) {
                        categorizedTasks[status].push(task);
                    }
                });

                // Set columns
                const initialColumns = Object.keys(MILESTONES).reduce((acc, key) => {
                    acc[key] = {
                        id: key,
                        title: MILESTONES[key],
                        taskIds: categorizedTasks[key].map(task => task.taskId.toString())
                    };
                    return acc;
                }, {});
                

                setColumns(initialColumns);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [project]);

    
    

    const onDragEnd = async (result) => {
        console.log(result);
        const { destination, source, draggableId } = result;
        if (!destination) return;
    
        const currentTime = new Date().toISOString();
        const taskId = parseInt(draggableId, 10);
    
        if (destination.droppableId === source.droppableId) {
            const column = columns[source.droppableId];
            const newTaskIds = Array.from(column.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const updatedColumn = {
                ...column,
                taskIds: newTaskIds,
            };
    
            setColumns({
                ...columns,
                [source.droppableId]: updatedColumn,
            });
        } else {
            const startColumn = columns[source.droppableId];
            const finishColumn = columns[destination.droppableId];
    
            const startTaskIds = Array.from(startColumn.taskIds);
            startTaskIds.splice(source.index, 1);
    
            const finishTaskIds = Array.from(finishColumn.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
    
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...startColumn,
                    taskIds: startTaskIds,
                },
                [destination.droppableId]: {
                    ...finishColumn,
                    taskIds: finishTaskIds,
                },
            });
    
            // POST request to update milestone
            try {
                await api.post('/timelines', {
                    milestone: destination.droppableId,
                    timestamp: currentTime,
                    task: {
                        taskId: taskId,
                    },
                    employeeName: userDetail.employeeName,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log('Task milestone updated successfully');
            } catch (error) {
                console.error('Error updating task milestone:', error);
            }
            console.log(taskId);
            api.put(`/tasks/${taskId}`,{"current_status":destination.droppableId})
            .then((response)=>{
                document.getElementById('update').style.color="green";
                document.getElementById('update').innerHTML='Task updated successfully';
                setTimeout(()=>{
                    document.getElementById('update').style.color="black";
                    document.getElementById('update').innerHTML='';
                },5000);
            })
            .catch((error)=>{
                alert('Error updating task milestone')
            })
        }
    };
    

    return (
        <div className="task-board">
            <span id='update'></span>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="columns-container">
                    {Object.keys(columns).map((columnId) => {
                        const column = columns[columnId];
                        const columnTasks = column.taskIds.map(taskId =>
                            tasks.find(task => task.taskId.toString() === taskId)
                        ).filter(task => task !== undefined); // Ensure no undefined tasks

                        return (
                            <Column
                                key={column.id}
                                columnId={column.id}
                                columnTitle={column.title}
                                tasks={columnTasks}
                                openModal={openModal}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard;
