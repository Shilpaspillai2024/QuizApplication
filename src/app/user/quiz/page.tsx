'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/Category";

const QuizHome: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched categories:", data);
        if (data.success) {
          setCategories(data.categories || []);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleStartQuiz = () => {
    if (userName && selectedCategoryId) {
      console.log(userName, selectedCategoryId);
      router.push(`/user/quiz/${selectedCategoryId}?name=${encodeURIComponent(userName)}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-800 to-blue-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center animate__animated animate__fadeInUp">Start Your Quiz</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-6 p-3 w-80 border border-gray-400 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      />

      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="mb-6 p-3 w-80 border border-gray-400 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
      >
        <option value="" disabled>Select a Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleStartQuiz}
        className="px-6 py-3 bg-sky-900 text-white rounded-full text-lg font-medium shadow-lg hover:bg-sky-700 transition ease-in-out duration-300 transform hover:scale-105"
        disabled={!userName || !selectedCategoryId}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizHome;

