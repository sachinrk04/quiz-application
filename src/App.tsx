import { QuizProvider, useQuiz } from "./context/QuizContext";
import HomePage from "./Components/HomePage";
import QuizBuilder from "./Components/QuizBuilder";
import QuizPlayer from "./Components/QuizPlayer";
import QuizHistory from "./Components/QuizHistory";
import ThemeToggle from "./Components/ThemeToggle";

const AppContent = () => {
  const { state } = useQuiz();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case "home":
        return <HomePage />;
      case "quiz-builder":
        return <QuizBuilder />;
      case "quiz-player":
        return <QuizPlayer />;
      case "quiz-history":
        return <QuizHistory />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        state.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Quiz Application
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{renderCurrentView()}</main>
    </div>
  );
};

const App = () => {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
};

export default App;
