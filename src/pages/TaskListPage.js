import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { TaskContext , TaskOps } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import styles from './TaskListPage.module.css'

import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';


export default function TaskListPage() {

    const navigate = useNavigate();

    const { tasks , taskDispatch } = useContext(TaskContext);

    const handleDragEnd = (result) => {
        if(!result.destination) return;

        const reordered = Array.from(tasks);
        const [movedTask] = reordered.splice(result.source.index , 1);
        reordered.splice(result.destination.index , 0 , movedTask);
        
        taskDispatch({type: TaskOps.REORDER , payload: reordered});
    }


    return (
        <div className={styles.taskListPage}>
            <button className={styles.createTaskButton} onClick={() => navigate('/create')}> Create a Task </button>

            {tasks.length === 0 && <p className={styles.noTasks}>There are no task left.</p>}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='task-list'>
                    {(provided) => (
                        <div
                            className={styles.taskList}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                                {tasks.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={index}>
                                            {(provided) => (
                                                <div
                                                className={styles.tasksDndContainer}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                    <TaskItem task={task}/>
                                                </div>
                                            )}
                                        </Draggable>
                                ))}
                                {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
  );
}