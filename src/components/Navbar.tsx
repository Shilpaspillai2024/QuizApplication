'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios';

const Navbar = () => {

    const router=useRouter();

    const handleLogout =async()=>{
        try {
            await axios.get('/api/admin/logout');

            router.push('/admin/login')
        } catch (error) {
            console.error('Error logging out:',error)
        }
    }
  return (
    <header className="w-full bg-slate-900 text-white py-4 px-6 fixed top-0 left-0 z-10 flex justify-between items-center shadow-md">
      <h2 className="text-2xl font-semibold text-gray-100">Quiz App</h2>
      <div className="flex items-center space-x-4">
        <div className="text-gray-300 hover:text-white cursor-pointer transition duration-300" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </header>
  );
};

export default Navbar;


