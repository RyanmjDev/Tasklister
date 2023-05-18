import React, {useState} from 'react';
import { HiLogout } from 'react-icons/hi';
import LogoutModal from './LogoutModal';


const LogoutButton = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    }



  return (
    <>
    <button
      className=" flex items-center justify-center space-x-2 bg-blue-500 text-white rounded-md px-1 py-1 md:px-4 md:py-2 absolute 
      bottom-1 left-1
      md:bottom-4 md:left-4
       hover:bg-blue-600 transition-colors duration-200 ease-in-out"
      onClick={() => setModalOpen(true)}
    >
      <HiLogout />
      <span className='hidden md:inline'>Logout</span>
    </button>

    {isModalOpen && <LogoutModal isModalOpen={isModalOpen} closeModal={closeModal}/> }
</>
  );
};

export default LogoutButton;
