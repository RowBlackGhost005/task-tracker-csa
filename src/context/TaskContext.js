import React, { createContext, useReducer, useEffect , useState } from 'react';

// Defines the operations accepted by this Context.
export const TaskOps = {
    ADD: "ADD",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    TOGGLE: "TOGGLE",
    LOAD: "LOAD",
    REORDER: "REORDER"
}

export const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case TaskOps.ADD:
            return [...state, action.payload];
        case TaskOps.UPDATE:
            return state.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task);
        case TaskOps.DELETE:
            return state.filter(task => task.id !== action.payload);
        case TaskOps.TOGGLE:
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case TaskOps.LOAD:
            return action.payload;
        case TaskOps.REORDER:
            return action.payload;
        default:
            return state;
    }
};

const fetchTaskData = () => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
}

// Context provider
export const TaskProvider = ({ children }) => {
    const [tasks, taskDispatch] = useReducer(taskReducer, [] , fetchTaskData);

    // Manages the ID to be issued to a new task.
    const [taskId , setTaskId] = useState(() => {
        return parseInt(localStorage.getItem('taskId') || '0' );
    });

    // Updates local storage of current ID
    useEffect(() => {
        localStorage.setItem('taskId' , taskId.toString());
    } , [taskId])

    // Load from localStorage once
    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        if (stored) {
        taskDispatch({ type: TaskOps.LOAD, payload: JSON.parse(stored) });
        }
    }, []);

    // Sync to localStorage on changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Passes the current ID to be used and updates it.
    const generateTaskId = () => {
        const newId = taskId + 1;
        setTaskId(newId);
        return newId;
    }

    return (
        <TaskContext.Provider value={{ tasks, generateTaskId ,taskDispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
