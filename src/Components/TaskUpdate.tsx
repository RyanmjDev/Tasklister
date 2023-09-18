import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import api from '../utils/api';

interface TaskUpdateProps {
  index: number;
  taskId: string;
  isEditing: boolean;
  toggleEdit: () => void;
  deleteTask: (index: number, taskId: string) => void;
}

const TaskUpdate: React.FC<TaskUpdateProps> = ({ index, taskId, isEditing, toggleEdit, deleteTask }) => {
  const handleDelete = async () => {
    deleteTask(index, taskId);
  }

  return (
    <div className='flex justify-end items-center'>
      {!isEditing && (
        <button
          className='text-blue-500 hover:text-blue-600 mr-2'
          onClick={toggleEdit}
        >
          <AiOutlineEdit />
        </button>
      )}
      <button
        className='text-red-500 hover:text-red-600'
        onClick={handleDelete}
      >
        <AiOutlineDelete />
      </button>
    </div>
  )
}

export default TaskUpdate;
