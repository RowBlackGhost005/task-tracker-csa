import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext , TaskOps } from '../context/TaskContext';
import './TaskDetailPage.css';

export default function TaskDetailsPage() {
  //Takes the ID from the params of the url.
  const { id } = useParams();
  const { tasks, taskDispatch } = useContext(TaskContext);
  const navigate = useNavigate();

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
    return <p className="not-found">An error ocurred and the task details cannot be found.</p>;
  }

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to List</button>

      <div className="details-card">
        {editMode ? (
          <>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="edit-input"
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="edit-input"
            />
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="edit-textarea"
            />
            <button onClick={handleUpdate} className="save-btn">Save</button>
          </>
        ) : (
          <>
            <h2>{task.title}</h2>
            <p><strong>Due:</strong> {task.dueDate}</p>
            <p><strong>Description:</strong> {task.description || 'No description added.'}</p>
            <button onClick={() => setEditMode(true)} className="edit-btn">Edit</button>
          </>
        )}
      </div>
    </div>
  );
}