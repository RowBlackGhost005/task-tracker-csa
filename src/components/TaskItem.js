import React, { useContext } from 'react';

import { Link } from 'react-router-dom';


import { TaskContext , TaskOps } from '../context/TaskContext';
import styles from './TaskItem.module.css'

export default function TaskItem({ task }) {
  const { taskDispatch } = useContext(TaskContext);

  const handleToggle = () => {
    taskDispatch({ type: TaskOps.TOGGLE, payload: task.id });
  };

  const handleDelete = () => {
    taskDispatch({ type: TaskOps.DELETE , payload: task.id});
  }

  return (
    <div className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className={styles.taskToggle}/>
        
        <Link to={`/task/${task.id}`} className={styles.taskLink}>
            <div className={styles.taskContent}>
                <div className={styles.taskTitle}>{task.title}</div>
                <div className={styles.taskDate}>Due: {task.dueDate}</div>
            </div>
        </Link>

      <button className={styles.deleteBtn} onClick={handleDelete}>
        <img src="/images/delete.png" alt="Delete" className={styles.deleteIcon} />
      </button>
    </div>
    
  );
}