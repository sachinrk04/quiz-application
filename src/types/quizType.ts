export type QuestionType = "single-choice" | "multiple-choice";

export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number | number[]; // Single answer or multiple answers
    explanation?: string;
    type: QuestionType;
    timeLimit?: number; // Time limit in seconds for individual questions
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    timeLimit?: number; // Overall time limit in seconds
    shuffleQuestions: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface QuizResult {
    quizId: string;
    score: number;
    totalQuestions: number;
    timeSpent: number;
    answers: {questionId: number; selectedAnswer: number | number[]; isCorrect: boolean; isSkipped: boolean}[];
    skippedCount: number;
    completedAt: Date;
}

export interface QuizState {
    currentQuestion: number;
    selectedAnswers: {[key: number]: number | number[] | undefined};
    skippedQuestions: {[key: number]: boolean};
    isCompleted: boolean;
    startTime: number;
    timeRemaining?: number;
    result?: QuizResult;
    quiz?: Quiz;
}

export interface AppState {
    currentView: "home" | "quiz-builder" | "quiz-player" | "quiz-history";
    quizzes: Quiz[];
    quizHistory: QuizResult[];
    theme: "light" | "dark";
}
