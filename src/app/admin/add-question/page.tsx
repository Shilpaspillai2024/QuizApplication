'use client'

import AdminSidebar from '@/components/AdminSidebar';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '@/types/Category';
import { Question } from '@/types/Question';
const AddQuestionPage = () => {

  const[categories,setCategories]=useState<Category[]>([])
  const [categoryId,setCategoryId]=useState('')
  const[questionText,setQuestionText]=useState('')
  const[options,setOptions]=useState<Question['options']>({A:"",B:"",C:"",D:""});
  const[correctAnswer,setCorrectAnswer]=useState<Question['correctAnswer']>("")
  
   const fetchCategories =async ()=>{
     try {

      const response =await axios.get<{
        success:boolean;categories:Category[]
      }>('/api/admin/categories')

      setCategories(response.data.categories)
      
     } catch (error) {
      console.error("failed to fetch Categories",error)
     }
   }


   const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!categoryId || !questionText ||!correctAnswer) return
    try {

      const response =await axios.post("/api/admin/questions",{
        categoryId,
        questionText,
        options,
        correctAnswer,
      })

      console.log("Question added successfully",response.data)


      setCategoryId('')
      setQuestionText('')
        setOptions({A:"",B:"",C:"",D:""})
        setCorrectAnswer("")
      
      
    } catch (error) {

      console.error("failed to add question",error)
      
    }
   }


   useEffect(()=>{
    fetchCategories();
   },[])

  return (

    <>
    <Navbar/>
    <AdminSidebar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
        <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Add New Question</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Text */}
            <div>
              <label htmlFor="questionText" className="block text-sm font-medium text-gray-600">
                Question
              </label>
              <textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Enter the question"
                rows={4}
                required
              />
            </div>

            {/* Options */}
            {(['A', 'B', 'C', 'D'] as Array<keyof Question['options']>).map((option) => (
              <div key={option}>
                <label htmlFor={`option${option}`} className="block text-sm font-medium text-gray-600">
                  Option {option}
                </label>
                <input
                  type="text"
                  id={`option${option}`}
                  value={options[option]}
                  onChange={(e) => setOptions({ ...options, [option]: e.target.value })}
                  className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder={`Enter option ${option}`}
                  required
                />
              </div>
            ))}

            {/* Correct Answer */}
            <div>
              <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-600">
                Correct Answer
              </label>
              <select
                id="correctAnswer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select correct answer</option>
                {(['A', 'B', 'C', 'D'] as Array<keyof Question['options']>).map((option)=> (
                  <option key={option} value={options[option]}>
                    Option {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-slate-950 rounded-lg hover:bg-slate-700 focus:outline-none transition-all duration-200"
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
