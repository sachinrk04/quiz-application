import { QuizResult } from "../types/quizType";

interface QuizResultsProps {
  result: QuizResult;
  onRestart: () => void;
  onReviewAnswers: () => void;
}

const QuizResults = ({
  result,
  onRestart,
  onReviewAnswers,
}: QuizResultsProps) => {
  const answeredQuestions = result.totalQuestions - result.skippedCount;
  const overallPercentage = Math.round(
    (result.score / result.totalQuestions) * 100
  );
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  return (
    <div className="max-w-2xl mx-auto p-4 rounded-md border">
      <div className="text-center">
        <div className="mx-auto mb-2 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"></div>
        <div className="text-xl font-semibold">Quiz Complete!</div>
      </div>
      <div className="flex justify-between gap-4 mt-4">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Score
            </span>
          </div>
          <div className={`text-2xl font-bold text-foreground`}>
            {result.score}/{answeredQuestions}
          </div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Time
            </span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Overall
            </span>
          </div>
          <div className={`text-2xl font-bold text-foreground`}>
            {overallPercentage}
          </div>
        </div>
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Skipped
            </span>
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {result.skippedCount}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 mt-4">
        <button
          className="border px-2 py-1 rounded-md"
          onClick={onReviewAnswers}
        >
          Review Answers
        </button>
        <button className="border px-2 py-1 rounded-md" onClick={onRestart}>
          Take Quiz Again
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
