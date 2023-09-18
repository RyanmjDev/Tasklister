import Cookies from 'js-cookie';
import axios from 'axios';

export const checkLoggedIn = (navigate:string) => {
  if (Cookies.get("token")) {
    navigate('/'); 
  } 
};

export const checkLoggedOut = (navigate:string) => {
    if (!Cookies.get("token")) {
        navigate('/login'); 
      } 
}

export const logout = (navigate:string) => {
  localStorage.removeItem('token');
  Cookies.remove('token');
  delete axios.defaults.headers.common['Authorization'];
  navigate('/login'); 
}