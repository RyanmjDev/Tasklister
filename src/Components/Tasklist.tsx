import React, { useState, useEffect } from 'react';
import CreateTask from './CreateTask';
import Task from './Task';
import api from '../utils/api';

const Tasklist: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/api/tasks/');
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks();
  }, []);

  const addTask = (task: any) => {
    setTasks([...tasks, task]);
  }

  const deleteTask = async (index: number, taskId: string) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-10'>
      <h1 className='text-center text-3xl mb-4'>Tasklister</h1>
      <CreateTask addTask={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={task._id}
          taskId={task._id}
          index={index}
          text={task.description}
          completed={task.completed}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  )
}

export default Tasklist;
