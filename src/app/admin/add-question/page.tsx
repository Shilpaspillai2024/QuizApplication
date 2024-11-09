import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const AddQuestionPage = () => {
  

  return (

    <>
    <Navbar/>
     <div className="flex items-center justify-center  bg-gray-100 mt-11">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Question</h2>

        <form className="space-y-4" >
          {/* Question */}
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-600">Question</label>
            <textarea
              id="question"
             
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter the question"
            />
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div>
              <label htmlFor="optionA" className="block text-sm font-medium text-gray-600">Option A</label>
              <input
                type="text"
                id="optionA"
               
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter option A"
              />
            </div>
            <div>
              <label htmlFor="optionB" className="block text-sm font-medium text-gray-600">Option B</label>
              <input
                type="text"
                id="optionB"
               
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter option B"
              />
            </div>
            <div>
              <label htmlFor="optionC" className="block text-sm font-medium text-gray-600">Option C</label>
              <input
                type="text"
                id="optionC"
                
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter option C"
              />
            </div>
            <div>
              <label htmlFor="optionD" className="block text-sm font-medium text-gray-600">Option D</label>
              <input
                type="text"
                id="optionD"
                
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter option D"
              />
            </div>
          </div>

          {/* Correct Answer */}
          <div>
            <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-600">Correct Answer</label>
            <select
              id="correctAnswer"
            
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            >
              <option value="">Select correct answer</option>
              <option value="optionA">Option A</option>
              <option value="optionB">Option B</option>
              <option value="optionC">Option C</option>
              <option value="optionD">Option D</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-slate-950 rounded hover:bg-slate-700 focus:outline-none"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
    </>
   
  );
};

export default AddQuestionPage;
