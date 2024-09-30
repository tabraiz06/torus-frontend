import React, { useContext, useState } from "react";
import { contextApi } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateTask from "./CreateTask";
import Summary from "./Summary";

const Dashboard = () => {
  const navigate= useNavigate()
  const {
    tasks,
    createTask,
    deleteTask,
    updatedTask,
    setUpdatedTask,
    updateIndex,
    setUpdateIndex,
  } = contextApi();
  



  const { user, logout,users, admin } = useContext(AuthContext);

 
 

  const handleLogout=()=>{
logout()
if(!localStorage.getItem('token'))navigate('/')
  }
const handleUpdate=(index,ele)=>{
 
setUpdateIndex(index)
setUpdatedTask(ele)
}

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-around">
        <h2 className="text-3xl font-bold mb-6">{user?.name}'s Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-600">
          Logout
        </button>
      </div>
    <CreateTask />

      <h3 className="text-2xl font-bold mb-4">Your Tasks</h3>
      <ul className="space-y-4">
        
        {tasks.map((task,i) => (
          <li key={task._id} className="p-4 bg-white rounded shadow">
            <h4 className="text-xl font-semibold">{task.title}</h4>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.priority}</p>
            <p>Created BY: {task.createdBy.name}</p>
            <p>Assigned to: {task.assignedUser?.name || "Unassigned"}</p>

            <div className="flex justify-around">
              <button
                onClick={() => deleteTask(task._id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(i,task)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
     {admin && <Summary/>}
    </div>
  );
};

export default Dashboard;
