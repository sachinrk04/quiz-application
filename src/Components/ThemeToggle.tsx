import { Moon, Sun } from "lucide-react";
import { useQuiz } from "../context/QuizContext";

const ThemeToggle = () => {
  const { state, setTheme } = useQuiz();

  const toggleTheme = () => {
    setTheme(state.theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${
        state.theme === "light" ? "dark" : "light"
      } mode`}
      title={`Switch to ${state.theme === "light" ? "dark" : "light"} mode`}
    >
      {state.theme === "light" ? (
        <Moon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Sun className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
