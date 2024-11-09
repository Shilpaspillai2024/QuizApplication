'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
      

      const[formData,setFormData] =useState({username:'',password:''});

      const router=useRouter();

   const handleSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try {
        const response =await axios.post('/api/admin/login',formData,{
          withCredentials:true
        })


        if(response.data.success){
            toast.success("Login SuceesFull")

            document.cookie=`token=${response.data.token};path=/`;
            router.push('/admin/dashboard')
        }else{
            toast.error(response.data.message || ' invalid credentials')
        }
        
    } catch (error) {
        toast.error('an error occured pls try again')
        console.error(error)
        
    }
   }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e)=>setFormData({...formData,username:e.target.value})}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-slate-950 rounded hover:bg-slate-700 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
