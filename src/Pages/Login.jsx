import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../utils/api';
import { checkLoggedIn } from '../utils/auth';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  
  
  
  
  useEffect(() => {
      checkLoggedIn(navigate);
      }, []);
    


  const handleSubmit = async (e) => {

  


    e.preventDefault();
    try {
      const response = await api.post('/api/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      Cookies.set("token", token, { expires: 1 });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  const handleRegister = () => {
    navigate('/register'); 
  };


  



  return ( 
    <div className="flex md:justify-center md:items-center md:h-screen md:w-screen bg-gray-100">
      <div className="flex flex-col justify-center bg-white shadow-lg rounded-lg p-8 w-full md:max-w-xl md:w-5/6 md:rounded-md">
        <h1 className="text-4xl text-center mb-8 font-bold">Tasklister</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-6">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-sm text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-sm text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 text-lg hover:bg-blue-600 w-full transition-colors duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
          <hr className="border-gray-300 mb-6" />
          <div className="mt-2">
            <button
              type="button"
              onClick={handleRegister}
              className="border border-gray-600 text-black font-semibold rounded-lg py-2 px-4 text-lg hover:bg-gray-100 w-full transition-colors duration-300 ease-in-out"
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
