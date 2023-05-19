import React, {useState, useEffect} from 'react'
import CreateTask from './CreateTask'
import Task from './Task'
import axios from 'axios';
import Cookies from 'js-cookie';
import api from '../utils/api';
import { checkLoggedOut } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';


const Tasklist = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
      checkLoggedOut(navigate);
    }, [])

    const addTask = (task) => {
        task && setTasks((prevTasks) => [task, ...prevTasks]);
      };

      const deleteTask = async (index, taskId) => {
        try {
          await api.delete(`/api/tasks/${taskId}`).then((res) => {
            setTasks((prevTasks) => {
              const updatedTasks = [...prevTasks];
              updatedTasks.splice(index, 1);
              return updatedTasks;
            });
          });
        } catch (error) {
          console.log(error);
        }
      };
      
      const fetchTasks = async () => {

        try {
          await api.get("/api/tasks/").then((res) => {
            console.log(res.data);
            setTasks(res.data);
          });
        } catch (error) {
          console.log(error);
        }

      }

    useEffect(() => {
      fetchTasks();
    }, [])

      
    

  return (
 
    <div className="flex justify-center items-center h-screen m:w-screen">
      <div className="flex justify-center bg-gray-50 shadow-lg  px-2
      h-screen w-screen
      max-w-lg m:w-1/2 lg:h-3/4 md:rounded-md
    ">
    

<div className="flex flex-col w-full ">
            <CreateTask addTask={addTask}/>   


<div className="h-[calc(100%-3rem)] overflow-y-auto
scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ">
{tasks.map((task, index) => {
  return (
    <Task
      key={task._id}
      taskId={task._id}
      index={index}
      text={task.description}
      completed={task.completed}
      deleteTask={deleteTask}
    />
  );
})}
     </div>
     <LogoutButton/>    
    </div>
        </div>
    </div>
  )
}

export default Tasklist