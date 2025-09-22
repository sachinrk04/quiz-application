import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AppState, Quiz, QuizResult } from "../types/quizType";

type AppAction =
  | { type: "SET_VIEW"; payload: AppState["currentView"] }
  | { type: "SET_THEME"; payload: AppState["theme"] }
  | { type: "ADD_QUIZ"; payload: Quiz }
  | { type: "UPDATE_QUIZ"; payload: Quiz }
  | { type: "DELETE_QUIZ"; payload: string }
  | { type: "ADD_QUIZ_RESULT"; payload: QuizResult }
  | {
      type: "LOAD_DATA";
      payload: { quizzes: Quiz[]; quizHistory: QuizResult[] };
    };

const initialState: AppState = {
  currentView: "home",
  quizzes: [],
  quizHistory: [],
  theme: "light",
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, currentView: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "ADD_QUIZ":
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    case "UPDATE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.map((quiz) =>
          quiz.id === action.payload.id ? action.payload : quiz
        ),
      };
    case "DELETE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter((quiz) => quiz.id !== action.payload),
      };
    case "ADD_QUIZ_RESULT":
      return { ...state, quizHistory: [...state.quizHistory, action.payload] };
    case "LOAD_DATA":
      return {
        ...state,
        quizzes: action.payload.quizzes,
        quizHistory: action.payload.quizHistory,
      };
    default:
      return state;
  }
}

interface QuizContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setView: (view: AppState["currentView"]) => void;
  setTheme: (theme: AppState["theme"]) => void;
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  addQuizResult: (result: QuizResult) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedQuizzes = localStorage.getItem("quiz-app-quizzes");
    const savedHistory = localStorage.getItem("quiz-app-history");
    const savedTheme = localStorage.getItem("quiz-app-theme");

    if (savedTheme) {
      dispatch({ type: "SET_THEME", payload: savedTheme as AppState["theme"] });
    }

    if (savedQuizzes) {
      try {
        const quizzes = JSON.parse(savedQuizzes).map((quiz: any) => ({
          ...quiz,
          createdAt: new Date(quiz.createdAt),
          updatedAt: new Date(quiz.updatedAt),
        }));
        const history = savedHistory
          ? JSON.parse(savedHistory).map((result: any) => ({
              ...result,
              completedAt: new Date(result.completedAt),
            }))
          : [];

        dispatch({
          type: "LOAD_DATA",
          payload: { quizzes, quizHistory: history },
        });
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("quiz-app-quizzes", JSON.stringify(state.quizzes));
    localStorage.setItem("quiz-app-history", JSON.stringify(state.quizHistory));
    localStorage.setItem("quiz-app-theme", state.theme);
  }, [state.quizzes, state.quizHistory, state.theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  const setView = (view: AppState["currentView"]) => {
    dispatch({ type: "SET_VIEW", payload: view });
  };

  const setTheme = (theme: AppState["theme"]) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };

  const addQuiz = (quiz: Quiz) => {
    dispatch({ type: "ADD_QUIZ", payload: quiz });
  };

  const updateQuiz = (quiz: Quiz) => {
    dispatch({ type: "UPDATE_QUIZ", payload: quiz });
  };

  const deleteQuiz = (id: string) => {
    dispatch({ type: "DELETE_QUIZ", payload: id });
  };

  const addQuizResult = (result: QuizResult) => {
    dispatch({ type: "ADD_QUIZ_RESULT", payload: result });
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        setView,
        setTheme,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        addQuizResult,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
