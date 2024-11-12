"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { Category } from "@/types/Category";
import axios from "axios";
import AdminSidebar from "@/components/AdminSidebar";

const AddCategoryPage = () => {
  const [category, setCategoryName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error,setError] =useState<string |null>(null)
  const fetchCategories = async () => {
    try {
      const response = await axios.get<{
        success: boolean;
        categories: Category[];
      }>("/api/admin/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("failed to fetch categories", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const categoryName=category.trim();

    if (!categoryName) {
      setError("category name is required")
      return;
    }

    const categoryExists= categories.some(
      (category)=>category.name.toLowerCase()=== categoryName.toLowerCase()
)

    if(categoryExists){
      setError("category name already exists")
      return
    }

    try {
      const response = await axios.post<{
        success: boolean;
        newCategory: Category;
      }>("/api/admin/categories", { categoryName });
      setCategories([...categories, response.data.newCategory]);
      setCategoryName("");
    } catch (error) {
      console.log("failed to add Categroy", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <AdminSidebar/>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Add New Category
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-600"
              >
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={category}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter category name"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 text-white bg-slate-950 rounded hover:bg-slate-700 focus:outline-none"
            >
              Add Category
            </button>
          </form>
           <div className="mt-4">
            <h3 className="text-xl font-medium text-gray-700 mb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-gray-600 font-medium">{category.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

   
    </>
  );
};

export default AddCategoryPage;
