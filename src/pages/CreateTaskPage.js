import React, { useState , useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import styles from './CreateTaskPage.module.css'

import { TaskContext , TaskOps } from '../context/TaskContext';

const CreateTaskPage = () => {

    const { taskDispatch , generateTaskId } = useContext(TaskContext);

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    //Ensures only Today onwards can be selected
    const today = new Date();
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !dueDate) {
          alert("Please fill in all fields.");
          return;
        }

        const newTask = {
          id: generateTaskId(),
          title: title,
          dueDate: dueDate,
          description: description,
          completed: false
        };
        
        navigate('/')

        taskDispatch({type: TaskOps.ADD , payload: newTask})
        setTitle('');
        setDueDate('');
        setDescription('');
    };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <label>
        Task Name:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter task title"
        />
      </label>

      <label>
        Due Date:
        <input
          type="date"
          value={dueDate}
          min={today.toISOString().split("T")[0]}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
      </label>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default CreateTaskPage;
