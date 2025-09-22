import { SkipForward } from "lucide-react";
import { Question } from "../types/quizType";
import QuestionOption from "./QuestionOption";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number | number[];
  onAnswerSelect: (answer: number | number[]) => void;
  showResult?: boolean;
  isSkipped?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  isSkipped = false,
}: QuestionCardProps) => {
  const handleOptionClick = (optionIndex: number) => {
    if (showResult) return;

    if (question.type === "single-choice") {
      onAnswerSelect(optionIndex);
    } else {
      const currentAnswers = Array.isArray(selectedAnswer)
        ? selectedAnswer
        : [];
      const newAnswers = currentAnswers.includes(optionIndex)
        ? currentAnswers.filter((i) => i !== optionIndex)
        : [...currentAnswers, optionIndex];
      onAnswerSelect(newAnswers);
    }
  };

  const isOptionSelected = (optionIndex: number) => {
    if (Array.isArray(selectedAnswer)) {
      return selectedAnswer.includes(optionIndex);
    }
    return selectedAnswer === optionIndex;
  };

  const isOptionCorrect = (optionIndex: number) => {
    const correctAnswers = Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [question.correctAnswer];
    return correctAnswers.includes(optionIndex);
  };

  const isOptionWrong = (optionIndex: number) => {
    if (!showResult) return false;

    const correctAnswers = Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [question.correctAnswer];

    const selectedAnswers = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : selectedAnswer !== undefined
      ? [selectedAnswer]
      : [];

    return (
      selectedAnswers.includes(optionIndex) &&
      !correctAnswers.includes(optionIndex)
    );
  };
  return (
    <div role="region" aria-labelledby={`question-${questionNumber}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium" id={`question-${questionNumber}`}>
          Question {questionNumber} / {totalQuestions}
        </span>
        {showResult && isSkipped && (
          <div
            className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400"
            role="status"
            aria-label="Question was skipped"
          >
            <SkipForward className="w-4 h-4" aria-hidden="true" />
            <span>Skipped</span>
          </div>
        )}
      </div>
      <div className="text-lg font-semibold mb-3" role="heading" aria-level={2}>
        {question.question}
      </div>
      <fieldset className="flex flex-col gap-y-3">
        <legend className="sr-only">
          Answer options for question {questionNumber}
        </legend>
        {question.options.map((option, index) => (
          <QuestionOption
            key={index}
            option={option}
            index={index}
            questionNumber={questionNumber}
            questionType={question.type}
            isSelected={isOptionSelected(index)}
            isCorrect={isOptionCorrect(index)}
            isWrong={isOptionWrong(index)}
            showResult={showResult}
            onSelect={handleOptionClick}
          />
        ))}
      </fieldset>

      {showResult && isSkipped && (
        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <p className="text-sm text-orange-800 dark:text-orange-200">
            This question was skipped. The correct answer is highlighted above.
          </p>
        </div>
      )}

      {showResult && !isSkipped && question.explanation && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-1">Explanation:</p>
          <p className="text-sm text-pretty leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
