import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    userId: "",
    startDate: "",
    endDate: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users for filtering
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://torus-backend.vercel.app/api/me"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "https://torus-backend.vercel.app/api/tasks/summary",
        {
          params: filters,
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching summary report:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSummary();
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Task Summary Report</h2>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="userId"
          value={filters.userId}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Generate Report
        </button>
      </form>

      {/* Task Summary Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Priority</th>
              <th className="px-4 py-2 border">Assigned User</th>
              <th className="px-4 py-2 border">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border">{task.description}</td>
                  <td className="px-4 py-2 border">{task.status}</td>
                  <td className="px-4 py-2 border">{task.priority}</td>
                  <td className="px-4 py-2 border">
                    {task.assignedUser ? task.assignedUser.name : "Unassigned"}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatDate(task.dueDate)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
