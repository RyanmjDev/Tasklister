import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import api from '../utils/api';

interface CreateTaskProps {
  addTask: (task: any) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  }

  const handleSubmit = async () => {
    if (newTask) {
      try {
        const response = await api.post('/api/tasks/', { description: newTask });
        addTask(response.data);
        setNewTask('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className='flex justify-center mt-4 mb-4 align-middle'>
      <div className='flex justify-start items-center w-full '>
        <input type="text"
          value={newTask}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Write a new task..."
          maxLength={250}
          className='flex-grow border border-gray-400 p-1 mr-2 create-task' />
        <button
          className='bg-blue-500 text-white rounded-full
          py-2 px-2 text-lg
          hover:bg-blue-600'
          onClick={handleSubmit}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  )
}

export default CreateTask;
