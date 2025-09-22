import { memo } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface QuestionOptionProps {
  option: string;
  index: number;
  questionNumber: number;
  questionType: "single-choice" | "multiple-choice";
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  showResult: boolean;
  onSelect: (index: number) => void;
}

const QuestionOption = memo(
  ({
    option,
    index,
    questionNumber,
    questionType,
    isSelected,
    isCorrect,
    isWrong,
    showResult,
    onSelect,
  }: QuestionOptionProps) => {
    const handleClick = () => {
      if (!showResult) {
        onSelect(index);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showResult && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onSelect(index);
      }
    };

    const getOptionIcon = () => {
      if (!showResult) return null;

      if (isCorrect) {
        return (
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        );
      }

      if (isWrong) {
        return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
      }

      return null;
    };

    return (
      <div
        className={`flex items-center justify-between gap-1 p-2 rounded-md border cursor-pointer transition-all duration-200 ${
          showResult ? "cursor-default" : "hover:bg-primary/20 hover:shadow-sm"
        } ${
          isSelected
            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
            : ""
        }`}
        onClick={handleClick}
        role={questionType === "single-choice" ? "radio" : "checkbox"}
        aria-checked={isSelected}
        tabIndex={showResult ? -1 : 0}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between gap-1">
          <input
            type={questionType === "single-choice" ? "radio" : "checkbox"}
            name={`question-${questionNumber}`}
            value={index}
            checked={isSelected}
            disabled={showResult}
            className="w-4 h-4"
            onChange={() => handleClick()}
            aria-describedby={`option-${questionNumber}-${index}-description`}
          />
          <label
            className="text-md cursor-pointer"
            htmlFor={`question-${questionNumber}-option-${index}`}
            id={`option-${questionNumber}-${index}-description`}
          >
            {option}
          </label>
        </div>
        <div className="flex items-center justify-between" aria-hidden="true">
          {getOptionIcon()}
        </div>
      </div>
    );
  }
);

QuestionOption.displayName = "QuestionOption";

export default QuestionOption;
