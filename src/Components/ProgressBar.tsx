interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}
const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps) => {
  const percentage = (currentQuestion / totalQuestions) * 100;
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm font-medium">
          {currentQuestion} / {totalQuestions}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-300 rounded-full">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
