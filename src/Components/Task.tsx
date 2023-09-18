import React, { useState, useEffect } from "react";
import TaskUpdate from "./TaskUpdate";
import api from '../utils/api';

interface TaskProps {
  taskId: string;
  index: number;
  text: string;
  completed: boolean;
  deleteTask: (index: number, taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ taskId, index, text, completed, deleteTask }) => {
  const [isComplete, setIsComplete] = useState<boolean>(completed);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskText, setTaskText] = useState<string>(text);

  useEffect(() => {
    setIsComplete(completed);
  }, [completed]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      toggleEdit();
    }
  };

  const handleToggleCompletion = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isEditing) {
      try {
        const updatedCompleted = !isComplete;
        await api.put(`/api/tasks/${taskId}`, { completed: updatedCompleted });
        setIsComplete(updatedCompleted);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-between max-w-lg mx-auto">
      <div
        className={`flex w-full py-2 align-middle 
    shadow-md mb-3 border-2 border-gray-200
    hover:bg-slate-100 
    ${isComplete ? 'bg-gray-100' : 'bg-white'}`}
        onClick={handleToggleCompletion}
      >
        <span className="px-2">
          {isEditing ? (
            <input
              type="text"
              value={taskText}
              className="border border-gray-400 w-80"
              onChange={handleEditTextChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span className={isComplete ? "completed-task" : ""}>{taskText}</span>
          )}
        </span>
      </div>

      <TaskUpdate
        index={index}
        taskId={taskId}
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Task;
