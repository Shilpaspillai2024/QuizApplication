import React from "react";
import { Question } from "@/types/Question";

interface QuestionCardProps {
  question: Question;
  selectedOption: string | number | undefined;
  onOptionChange: (questionId: string, option: string | number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onOptionChange }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">{question.questionText}</h2>
      <div>
        {Object.entries(question.options).map(([key, value]) => (
          <div key={key} className="mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={key}
                checked={selectedOption === key}
                onChange={() => onOptionChange(question._id, key)}
                className="mr-2"
              />
              {key}: {value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
