import { useQuiz } from "../context/QuizContext";

const HomePage = () => {
  const { state, setView } = useQuiz();

  const recentQuizzes = state.quizzes.slice(-3);
  const recentResults = state.quizHistory.slice(-3);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Application
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Create, take, and review quizzes
        </p>
      </div>

      <div className="flex justify-between gap-x-6 mb-8">
        <button
          onClick={() => setView("quiz-builder")}
          className="p-6 flex-1 text-gray-900 dark:text-white rounded-lg shadow-lg transition-colors flex flex-col items-center gap-3"
        >
          <span className="font-semibold">Create Quiz</span>
        </button>

        <button
          onClick={() => setView("quiz-player")}
          className="p-6 flex-1 text-gray-900 dark:text-white rounded-lg shadow-lg transition-colors flex flex-col items-center gap-3"
        >
          <span className="font-semibold">Take Quiz</span>
        </button>

        <button
          onClick={() => setView("quiz-history")}
          className="p-6 flex-1 text-gray-900 dark:text-white rounded-lg shadow-lg transition-colors flex flex-col items-center gap-3"
        >
          <span className="font-semibold">History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quizzes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Quizzes
          </h2>
          {recentQuizzes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No quizzes created yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.questions.length} questions
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Created {quiz.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Results
          </h2>
          {recentResults.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No quiz results yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentResults.map((result, index) => {
                const quiz = state.quizzes.find((q) => q.id === result.quizId);
                const percentage = Math.round(
                  (result.score / result.totalQuestions) * 100
                );

                return (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {quiz?.title || "Unknown Quiz"}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {result.score}/{result.totalQuestions} correct
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          percentage >= 80
                            ? "text-green-600 dark:text-green-400"
                            : percentage >= 60
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Completed {result.completedAt.toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
