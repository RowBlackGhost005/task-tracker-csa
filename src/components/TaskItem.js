import React, { useContext } from 'react';

import { Link } from 'react-router-dom';


import { TaskContext , TaskOps } from '../context/TaskContext';
import './TaskItem.css';

export default function TaskItem({ task }) {
  const { taskDispatch } = useContext(TaskContext);

  const handleToggle = () => {
    taskDispatch({ type: TaskOps.TOGGLE, payload: task.id });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="task-toggle"/>
        
        <Link to={`/task/${task.id}`} className="task-link">
            <div className="task-content">
                <div className="task-title">{task.title}</div>
                <div className="task-date">Due: {task.dueDate}</div>
            </div>
        </Link>
    </div>
    
  );
}