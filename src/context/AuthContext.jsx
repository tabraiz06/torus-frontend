import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  // Load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (admin) {
      axios.defaults.headers.common["Token"] = token;
      axios
        .get("https://torus-backend.vercel.app/api/me")
        .then((res) => setUsers(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
    setLoading(false);
  }, [admin]);

  // Register user
  const register = async (userData) => {
    const res = await axios.post(
      "https://torus-backend.vercel.app/api/register",
      userData
    );
    setUser(res.data.user);
    if (res.data.user.isAdmin) {
      setAdmin(res.data.user.isAdmin);
    }
    localStorage.setItem("token", res.data.token);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Token"] = token;
  };

  // Login user
  const login = async (credentials) => {
    const res = await axios.post(
      "https://torus-backend.vercel.app/api/login",
      credentials
    );
    setUser(res.data.user);
    if (res.data.user.isAdmin) {
      setAdmin(res.data.user.isAdmin);
    }

    localStorage.setItem("token", res.data.token);
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Token"] = res.data.token;
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Token"];
  };

  return (
    <AuthContext.Provider
      value={{
        setAdmin,
        setUser,
        admin,
        user,
        users,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
