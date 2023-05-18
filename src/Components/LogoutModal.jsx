import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';


const LogoutModal = ({ isModalOpen, closeModal }) => {

    const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleLogout = () => {
    logout(navigate);
    closeModal();
  };

  return (
    <>
    
      <div
        className="fixed inset-0 z-40 bg-gray-500 bg-opacity-10 backdrop-blur-sm"
        style={{ width: '100vw', height: '100vh', filter: 'blur(0)' }}
        onClick={() => closeModal()}
      ></div>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleClickOutside}
      >
        <div className="w-96 bg-white rounded-lg shadow-lg">

          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-8">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="px-4 py-2 ml-4 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
