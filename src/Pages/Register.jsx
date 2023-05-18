
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import api from '../utils/api';
import { checkLoggedIn } from '../utils/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    checkLoggedIn(navigate);
    }, []);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/users/register', { email, password } );
      console.log(response)

      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      Cookies.set("token", token, { expires: 1 });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Error creating account');
    }
  };
  const handleRegister = () => {
    navigate('/register'); 
  };




  return (
    <div className="flex md:justify-center md:items-center md:h-screen md:w-screen bg-gray-100
    ">
      <div className="flex flex-col justify-center bg-white shadow-lg rounded-lg p-8 
        w-full
        md:max-w-xl md:w-5/6 md:rounded-md">

{error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <h1 className="text-4xl text-center mb-8 font-bold">Tasklister</h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-6">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-sm text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"  
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-sm text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="verifyPassword"
              id="verifyPassword"
              placeholder="Verify password"
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-sm text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-gray-700 text-white font-semibold rounded-lg py-2 px-4 text-lg hover:bg-gray-800 w-full transition-colors duration-300 ease-in-out"
            >
              Register
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;
