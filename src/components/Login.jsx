import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const {setAdmin, setUser}= useContext(AuthContext)
    const navigate = useNavigate();
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("123456");
  
 
  const handleSubmit = async(e) => {
    e.preventDefault();
  const res = await axios.post("https://torus-backend.vercel.app/api/login", {
    email,
    password,
  });
     setUser(res.data.user);
     if (res.data.user.isAdmin) {
       setAdmin(res.data.user.isAdmin);
     }
   
     localStorage.setItem("token", res.data.token);
     const token = localStorage.getItem("token");
     axios.defaults.headers.common["Token"] = res.data.token;
     if(token){
      navigate('/dashboard')
     }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <Link to='/register' className="mt-2 text-blue-700">Dont have an account</Link>

      </div>
    </div>
  );
};

export default Login;
