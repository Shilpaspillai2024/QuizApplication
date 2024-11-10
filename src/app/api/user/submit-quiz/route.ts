
import { NextRequest, NextResponse } from "next/server";
import { connectiondb } from "@/utils/mongo";
import Question from "@/models/Question";

connectiondb();

interface WrongAnswer {
  question: string;
  correctAnswer: string;
  userAnswer: string | number;
}

export async function POST(req: NextRequest) {
  try {
    const { categoryId, userName, answers, completedAt } = await req.json();
    const questions = await Question.find({ categoryId }).exec();

    if (questions.length === 0) {
      return NextResponse.json(
        { success: false, message: "No questions found for this category" },
        { status: 404 }
      );
    }

    let correctAnswersCount = 0;
    const wrongAnswers: WrongAnswer[] = [];

    questions.forEach(question => {
        const userAnswer = answers[question._id];  
        const correctAnswer = question.correctAnswer;  
      
        
        const selectedOptionValue = question.options[userAnswer];
      
        if (selectedOptionValue === correctAnswer) {
          correctAnswersCount++;
        } else {
          wrongAnswers.push({
            question: question.question,
            userAnswer: selectedOptionValue,
            correctAnswer: correctAnswer
          });
        }
      });
      

    const score = (correctAnswersCount / questions.length) * 100;

    return NextResponse.json({
      success: true,
      score,
      correctAnswersCount,
      wrongAnswers,
      totalQuestions: questions.length,
      userName,
      completedAt
    });

  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json({ message: "Error submitting quiz" }, { status: 500 });
  }
}
