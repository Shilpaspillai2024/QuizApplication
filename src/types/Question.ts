export interface Question{
    _id: string;
  categoryId: string; 
  questionText: string;
  options: { A: string | number; B: string | number; C: string | number; D: string | number };
  correctAnswer: string | number;
}