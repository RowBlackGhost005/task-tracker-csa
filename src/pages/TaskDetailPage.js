import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext , TaskOps } from '../context/TaskContext';

import ConfirmDialog from '../components/ConfirmDialog';
import styles from './TaskDetailPage.module.css';

export default function TaskDetailsPage() {
  //Takes the ID from the params of the url.
  const { id } = useParams();
  const { tasks, taskDispatch } = useContext(TaskContext);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    taskDispatch({ type: TaskOps.DELETE, payload: task.id });
    setShowConfirm(false);
    navigate('/');
      
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  //Converts the ID of the params into a Number and fetch its details from context.
  const numericId = parseInt(id, 10);
  const task = tasks.find(t => t.id === numericId);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: task?.title || '',
    dueDate: task?.dueDate || '',
    description: task?.description || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    taskDispatch({ type: TaskOps.UPDATE, payload: { ...task, ...formData } });
    setEditMode(false);
  };

  if (!task) {
    return <p className={styles.notFound}>An error ocurred and the task details cannot be found.</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>← Back to List</button>

      <div className={styles.detailsCard}>
        {editMode ? (
          <>
            <label htmlFor='title'>Title</label>
            <input
              type="text"
              name="title"
              id='title'
              value={formData.title}
              onChange={handleChange}
              className={styles.editInput}
            />
            <label htmlFor='dueDate'>Due Date</label>
            <input
              type="date"
              name="dueDate"
              id='dueDate'
              value={formData.dueDate}
              onChange={handleChange}
              className={styles.editInput}
            />
            <label htmlFor='description'>Description</label>
            <textarea
              name="description"
              id='description'
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={styles.editTextarea}
            />
            <button onClick={handleUpdate} className={styles.saveBtn}>Save</button>
          </>
        ) : (
          <>
            <h2>{task.title}</h2>
            <p><strong>Due:</strong> {task.dueDate}</p>
            <p><strong>Description:</strong> {task.description || 'No description added.'}</p>
            <button onClick={() => setEditMode(true)} className={styles.editBtn}>Edit</button>
            <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
          </>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}/>
      )}

    </div>
  );
}