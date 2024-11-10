'use client'
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import QuestionCard from "@/components/QuestionCard";
import { Question } from "@/types/Question";

const QuizQuestions: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categoryId } = useParams() as { categoryId: string };
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get name safely from searchParams
  const name = React.useMemo(() => {
    return searchParams ? searchParams.get('name') || "" : "";
  }, [searchParams]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/user/question?category=${categoryId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch questions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [categoryId]);

  const handleOptionChange = (questionId: string, option: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!categoryId || !name) {
      setError("Missing required information");
      return;
    }
  
    try {
      const response = await fetch('/api/user/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          userName: name,
          answers,
          completedAt: new Date().toISOString()
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
  
      const result = await response.json();
  
      if (result.success) {
        router.push(`/user/result?score=${result.score}&total=${result.totalQuestions}&name=${encodeURIComponent(name)}&correctAnswers=${result.correctAnswersCount}&wrongAnswers=${encodeURIComponent(JSON.stringify(result.wrongAnswers))}`);
      } else {
        setError("Failed to get result data.");
      }
    } catch (error) {
      setError('Failed to submit quiz');
    }
  };
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen p-6">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-sky-900 text-white rounded"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No questions available for this category.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = Boolean(currentQuestion && answers[currentQuestion._id]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-800 to-blue-900 p-6">
  <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-xl">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-extrabold text-white">Quiz for {name}</h1>
      <span className="text-lg text-gray-300">
        Question {currentQuestionIndex + 1} of {questions.length}
      </span>
    </div>

    {currentQuestion && (
      <QuestionCard
        question={currentQuestion}
        selectedOption={answers[currentQuestion._id]}
        onOptionChange={handleOptionChange}
      />
    )}

    <button
      onClick={isLastQuestion ? handleSubmitQuiz : handleNextQuestion}
      disabled={!hasAnswered}
      className={`w-full mt-4 px-6 py-3 rounded-full transition-colors duration-300 ${
        hasAnswered
          ? isLastQuestion
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-sky-900 hover:bg-sky-700 text-white'
          : 'bg-gray-300 cursor-not-allowed'
      }`}
    >
      {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
    </button>
  </div>
</div>

  );
};

export default QuizQuestions;