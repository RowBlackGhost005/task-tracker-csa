import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { TaskContext , TaskOps } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import './TaskListPage.css';

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
        <div className="task-list-page">
            <button className="create-task-button" onClick={() => navigate('/create')}> Create a Task </button>


            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId='task-list'>
                    {(provided) => (
                        <div
                            className='task-list'
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                                {tasks.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id.toString()}
                                        index={index}>
                                            {(provided) => (
                                                <div
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