import { useState } from "react";
import { ArrowLeft, Play, Shuffle, Clock } from "lucide-react";
import { useQuiz } from "../context/QuizContext";
import { Quiz, QuizState, QuizResult } from "../types/quizType";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import QuizResults from "./QuizResults";

const QuizPlayer = () => {
  const { state, setView, addQuizResult } = useQuiz();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: {},
    skippedQuestions: {},
    isCompleted: false,
    startTime: Date.now(),
  });
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Shuffle questions if needed
  const questions = selectedQuiz?.shuffleQuestions
    ? [...selectedQuiz.questions].sort(() => Math.random() - 0.5)
    : selectedQuiz?.questions || [];

  const currentQuestion = questions[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === questions.length - 1;
  const hasSelectedAnswer =
    quizState.selectedAnswers[currentQuestion?.id] !== undefined;
  const isCurrentQuestionSkipped =
    quizState.skippedQuestions[currentQuestion?.id] === true;

  const handleAnswerSelect = (answer: number | number[]) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [currentQuestion.id]: answer,
      },
      skippedQuestions: {
        ...prev.skippedQuestions,
        [currentQuestion.id]: false,
      },
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const canFinishQuiz = questions.every(
    (question) =>
      quizState.selectedAnswers[question.id] !== undefined ||
      quizState.skippedQuestions[question.id] === true
  );

  const handleSkipQuestion = () => {
    if (quizState.isCompleted) return;

    setQuizState((prev) => ({
      ...prev,
      skippedQuestions: {
        ...prev.skippedQuestions,
        [currentQuestion.id]: true,
      },
      selectedAnswers: {
        ...prev.selectedAnswers,
        [currentQuestion.id]: undefined,
      },
    }));

    if (!isLastQuestion) {
      handleNext();
    }
  };

  const handleFinishQuiz = () => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - quizState.startTime) / 1000);

    const answers = questions.map((question) => {
      const selectedAnswer = quizState.selectedAnswers[question.id];
      const isSkipped = quizState.skippedQuestions[question.id] === true;

      let isCorrect = false;
      if (!isSkipped && selectedAnswer !== undefined) {
        if (question.type === "single-choice") {
          isCorrect = selectedAnswer === question.correctAnswer;
        } else {
          const correctAnswers = Array.isArray(question.correctAnswer)
            ? question.correctAnswer
            : [question.correctAnswer];
          const selectedAnswers = Array.isArray(selectedAnswer)
            ? selectedAnswer
            : [selectedAnswer];

          isCorrect =
            correctAnswers.length === selectedAnswers.length &&
            correctAnswers.every((ans) => selectedAnswers.includes(ans));
        }
      }

      return {
        questionId: question.id,
        selectedAnswer:
          selectedAnswer ?? (question.type === "single-choice" ? -1 : []),
        isCorrect,
        isSkipped,
      };
    });

    const score = answers.filter((answer) => answer.isCorrect).length;
    const skippedCount = answers.filter((answer) => answer.isSkipped).length;

    const result: QuizResult = {
      quizId: selectedQuiz!.id,
      score,
      totalQuestions: questions.length,
      timeSpent,
      answers,
      skippedCount,
      completedAt: new Date(),
    };

    addQuizResult(result);

    setQuizState((prev) => ({
      ...prev,
      isCompleted: true,
      result,
    }));
  };

  const handleTimeUp = () => {
    handleFinishQuiz();
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      skippedQuestions: {},
      isCompleted: false,
      startTime: Date.now(),
    });
    setIsReviewMode(false);
  };

  const onReviewAnswers = () => {
    setIsReviewMode(true);
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: 0,
    }));
  };


  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      skippedQuestions: {},
      isCompleted: false,
      startTime: Date.now(),
    });
    setIsReviewMode(false);
  };

  // Quiz selection view
  if (!selectedQuiz) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView("home")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Select Quiz
          </h1>
        </div>

        {state.quizzes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No quizzes available. Create your first quiz!
            </p>
            <button
              onClick={() => setView("quiz-builder")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Create Quiz
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {quiz.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {quiz.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{quiz.questions.length} questions</span>
                  </div>

                  {quiz.timeLimit && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{Math.floor(quiz.timeLimit / 60)} minutes</span>
                    </div>
                  )}

                  {quiz.shuffleQuestions && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Shuffle className="w-4 h-4" />
                      <span>Shuffled</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => startQuiz(quiz)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Quiz completion view
  if (quizState.isCompleted && !isReviewMode) {
    return (
      <div className="pt-[10%] bg-background p-4 flex items-center justify-center">
        <QuizResults
          result={quizState.result!}
          onRestart={handleRestart}
          onReviewAnswers={onReviewAnswers}
        />
      </div>
    );
  }

  // Quiz taking view
  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center gap-4 w-full max-w-4xl">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectedQuiz.title}
          </h1>
          <div className="ml-auto">
            <Timer
              timeLimit={selectedQuiz.timeLimit}
              onTimeUp={handleTimeUp}
              startTime={quizState.startTime}
              isActive={!quizState.isCompleted}
            />
          </div>
        </div>
        <div className="max-w-4xl mt-2">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {selectedQuiz.description}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mt-8 flex flex-col gap-y-2">
          <ProgressBar
            currentQuestion={quizState.currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="w-[650px] p-4 border rounded-md">
            <QuestionCard
              question={currentQuestion}
              questionNumber={quizState.currentQuestion + 1}
              totalQuestions={questions.length}
              selectedAnswer={quizState.selectedAnswers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSelect}
              showResult={isReviewMode}
              isSkipped={isCurrentQuestionSkipped}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={quizState.currentQuestion === 0}
            className="border px-2 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {!isReviewMode && (
              <button
                className="border px-2 py-1 rounded-md"
                onClick={handleSkipQuestion}
              >
                Skip
              </button>
            )}

            {!isLastQuestion ? (
              <button
                className="border px-2 py-1 rounded-md"
                onClick={handleNext}
                disabled={
                  !hasSelectedAnswer &&
                  !isCurrentQuestionSkipped &&
                  !isReviewMode
                }
              >
                Next
              </button>
            ) : (
              !isReviewMode && (
                <button
                  onClick={handleFinishQuiz}
                  disabled={!canFinishQuiz}
                  className="border px-2 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Finish
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;
