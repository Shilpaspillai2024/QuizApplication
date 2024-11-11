'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const QuizResults: React.FC = () => {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const score = params.get("score");
    const total = params.get("total");
    const correctAnswers = parseInt(params.get("correctAnswers") || "0");
    const wrongAnswers = JSON.parse(params.get("wrongAnswers") || "[]");

    if (!name || !score || !total) {
      setError("Missing required data.");
      return;
    }

    setResults({
      name,
      score: parseFloat(score),
      totalQuestions: parseInt(total),
      correctAnswers,
      wrongAnswers,
    });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
<div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-800 to-blue-900 p-6">
  <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-xl">
    <h1 className="text-3xl font-extrabold text-white mb-6">Quiz Results for {results.name}</h1>

    <div className="mb-4 text-lg text-gray-300">
      <p>Total Questions: {results.totalQuestions}</p>
      <p>Correct Answers: {results.correctAnswers}</p>
      <p>Wrong Answers: {results.wrongAnswers.length}</p>
      <p>Total Score: {results.score}%</p>
    </div>
     
    {results.wrongAnswers.length > 0 && (
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Wrong Answers:</h2>
        <ul className="list-disc pl-6 text-gray-300">
          {results.wrongAnswers.map((wrongAnswer: any, index: number) => (
            <li key={index} className="mb-3">
              <strong className="text-white">Question:</strong> {wrongAnswer.question} <br />
              <strong className="text-white">Correct Answer:</strong> {wrongAnswer.correctAnswer}
            </li>
          ))}
        </ul>
      </div>
    )}

    <button
      onClick={() => router.push('/')}
      className="mt-6 px-6 py-3 bg-sky-900 text-white rounded-full hover:bg-sky-700 transition-colors duration-300"
    >
      Go to Home
    </button>
  </div>
</div>

  );
};

export default QuizResults;
