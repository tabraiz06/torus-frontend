import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";

const CreateTask = () => {

 
  const {
    tasks,
    createTask,
    deleteTask,
    updateIndex,
    updatedTask,
    updateTask,
    setUpdateIndex,
  } = contextApi();
  const { user, logout, users, admin } = useContext(AuthContext);

 
   const formatDate = (isoDate) => {
     const date = new Date(isoDate);
     const month = String(date.getMonth() + 1).padStart(2, "0");
     const day = String(date.getDate()).padStart(2, "0");
     const year = date.getFullYear();
     return `${month}/${day}/${year}`;
   };

   // Convert date to ISO format (YYYY-MM-DD) for input fields
   const convertToISO = (date) => {
     const newDate = new Date(date);
     return newDate.toISOString().split("T")[0];
   };
  

  useEffect(() => {
    if (updateIndex !==-1)
      setNewTask(
        admin
          ? {
              title: updateIndex !== -1 ? updatedTask.title : "",
              description: updateIndex !== -1 ? updatedTask.description : "",
              dueDate:
                updateIndex !== -1 ? convertToISO(updatedTask.dueDate) : "",
              priority: updateIndex !== -1 ? updatedTask.priority : "Medium",
              assignedUser: "",
            }
          : {
              title: updateIndex !== -1 ? updatedTask.title : "",
              description: updateIndex !== -1 ? updatedTask.description : "",
              dueDate:
                updateIndex !== -1 ? convertToISO(updatedTask.dueDate) : "",
              priority: updateIndex !== -1 ? updatedTask.priority : "Medium",
            }
      );
  }, [updateIndex]);

  const [newTask, setNewTask] = useState(
    admin
      ? {
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          assignedUser: "",
        }
      : {
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          
        }
  );
  const handleCreateTask = (e) => {
    e.preventDefault();
    if(updateIndex !== -1){
        updateTask(updatedTask._id,newTask)
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          
        });
       setUpdateIndex(-1)
    }
    else{
      createTask(newTask);
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
       assignedUser: "",
        });
    }
    
  };
  return (
    <div>
      <form onSubmit={handleCreateTask} className="mb-8 flex flex-col">
        <input
          className="border p-2 mb-4"
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Title"
          required
        />
        <textarea
          className="border p-2 mb-4"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Task Description"
          required
        />
        <input
          className="border p-2 mb-4"
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          required
        />
        <select
          className="border p-2 mb-4"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className="border p-2 mb-4"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Assign User Option (Only for Admin) */}
        {admin && (
          <select
            className="border p-2 mb-4"
            value={newTask.assignedUser}
            onChange={(e) =>
              setNewTask({ ...newTask, assignedUser: e.target.value })
            }
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {updateIndex!==-1 ? "upadte" : "create"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
