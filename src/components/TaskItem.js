import React, { useContext , useState } from 'react';

import { Link } from 'react-router-dom';

import ConfirmDialog from './ConfirmDialog';

import deleteIcon from '../images/delete.png'

import { TaskContext , TaskOps } from '../context/TaskContext';
import styles from './TaskItem.module.css'

export default function TaskItem({ task }) {
  const { taskDispatch } = useContext(TaskContext);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    taskDispatch({ type: TaskOps.DELETE , payload: task.id});
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };


  const handleToggle = () => {
    taskDispatch({ type: TaskOps.TOGGLE, payload: task.id });
  };

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
        <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} />
      </button>

      {showConfirm && (
        <ConfirmDialog
          message={"Are you sure you want to delete this task?"}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}/>
  )}

    </div>
    
  );
}