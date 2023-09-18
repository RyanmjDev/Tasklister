import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

interface TaskUpdateProps {
    index: number;
    taskId: string;
    isEditing: boolean;
    toggleEdit: () => void;
    deleteTask: (index: number, taskId: string) => void;
}

const TaskUpdate: React.FC<TaskUpdateProps> = ({ index, taskId, isEditing, toggleEdit, deleteTask }) => {
    const handleEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        toggleEdit();
    }

    return (
        <div className='flex justify-end items-center mb-3'>
            <span className='mr-4 ml-4 font-bold text-lg hover:text-blue-500' onClick={(event) => handleEdit(event)}>
                <FiEdit2 />
            </span>
            <span className='mr-2 font-bold hover:text-red-500 text-lg' onClick={() => deleteTask(index, taskId)}>
                <AiOutlineDelete />
            </span>
        </div>
    );
}

export default TaskUpdate;
