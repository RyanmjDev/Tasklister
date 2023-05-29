import axios from 'axios';
import Cookies from 'js-cookie';


// const serverURL = 'http://localhost:3000';
// const serverURL = 'https://tasklister-owxu.onrender.com/';
const serverURL = 'https://tasklister.herokuapp.com/'

const api = axios.create({
  baseURL: serverURL, // Currently doesn't work login
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = Cookies.get('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
