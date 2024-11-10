import AdminSidebar from '@/components/AdminSidebar';
import Navbar from '@/components/Navbar';
import React from 'react';

const ResultPage = () => {
 

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <div className="w-64">
        <AdminSidebar />
      </div>

      <div className="flex-1 flex flex-col">
      
        <Navbar />

       
        <div className="p-6 lg:p-10 flex-1 overflow-auto mt-14">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">User Quiz Results</h1>

          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-medium uppercase">Username</th>
                  <th className="py-4 px-6 text-left text-sm font-medium uppercase">Category</th>
                  <th className="py-4 px-6 text-center text-sm font-medium uppercase">Correct Answers</th>
                  <th className="py-4 px-6 text-center text-sm font-medium uppercase">Wrong Answers</th>
                  <th className="py-4 px-6 text-center text-sm font-medium uppercase">Total Score</th>
                </tr>
              </thead>
              <tbody>
                {/* {results.map((result, index) => (
                  <tr key={index} className="even:bg-gray-50 border-b last:border-none">
                    <td className="py-4 px-6 text-gray-700">{result.username}</td>
                    <td className="py-4 px-6 text-gray-700">{result.category}</td>
                    <td className="py-4 px-6 text-center text-green-600 font-semibold">{result.correctAnswers}</td>
                    <td className="py-4 px-6 text-center text-red-600 font-semibold">{result.wrongAnswers}</td>
                    <td className="py-4 px-6 text-center text-blue-600 font-bold">{result.totalScore}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
