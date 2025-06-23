import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import './TaskListPage.css';

export default function TaskListPage() {

    const navigate = useNavigate();

    const { tasks } = useContext(TaskContext);

    return (
        <div className="task-list-page">
            <button className="create-task-button" onClick={() => navigate('/create')}> Create a Task </button>

            <div className="task-list">
                {tasks.length === 0 ? (
                <p className="no-tasks">There are no task, yet.</p>
                ) : (
                tasks.map(task => <TaskItem key={task.id} task={task} />)
                )}
            </div>
        </div>
  );
}