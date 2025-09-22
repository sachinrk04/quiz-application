import { ArrowLeft, Calendar, Clock, Target } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

const QuizHistory = () => {
  const { state, setView } = useQuiz();

  const getQuizTitle = (quizId: string) => {
    const quiz = state.quizzes.find((q) => q.id === quizId);
    return quiz?.title || "Unknown Quiz";
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView("home")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quiz History
        </h1>
      </div>

      {state.quizHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Quiz Results Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Take your first quiz to see results here!
          </p>
          <button
            onClick={() => setView("quiz-player")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Take a Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {state.quizHistory.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Quizzes
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(
                  state.quizHistory.reduce(
                    (sum, result) =>
                      sum + (result.score / result.totalQuestions) * 100,
                    0
                  ) / state.quizHistory.length
                )}
                %
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Score
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(
                  state.quizHistory.reduce(
                    (sum, result) => sum + result.timeSpent,
                    0
                  ) /
                    state.quizHistory.length /
                    60
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg Time (min)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {state.quizHistory.reduce(
                  (sum, result) => sum + result.skippedCount,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Skipped
              </div>
            </div>
          </div>

          {/* Quiz Results */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Results
              </h2>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {state.quizHistory
                .sort(
                  (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
                )
                .map((result, index) => {
                  const percentage = Math.round(
                    (result.score / result.totalQuestions) * 100
                  );
                  const answeredQuestions =
                    result.totalQuestions - result.skippedCount;

                  return (
                    <div
                      key={index}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {getQuizTitle(result.quizId)}
                          </h3>

                          <div className="flex items-center gap-6 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              <span>
                                {result.score}/{answeredQuestions} correct
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(result.timeSpent)}</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(result.completedAt)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div
                              className={`text-2xl font-bold ${getScoreColor(
                                percentage
                              )}`}
                            >
                              {percentage}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Score
                            </div>
                          </div>

                          {result.skippedCount > 0 && (
                            <div className="text-right">
                              <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                                {result.skippedCount}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Skipped
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
