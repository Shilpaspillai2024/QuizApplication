 'use client'
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const AddCategoryPage = () => {
  const [categoryName, setCategoryName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here, you can add logic to handle the form submission, e.g., sending the data to the backend
//     console.log('Category Added:', categoryName);
//   };

  return (
 
   <>
   <Navbar/>

     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Category</h2>

        <form className="space-y-4" >
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter category name"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-slate-950 rounded hover:bg-slate-700 focus:outline-none"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
   </>

    
  );
};

export default AddCategoryPage;
