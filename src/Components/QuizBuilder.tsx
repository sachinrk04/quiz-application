import { useState } from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useQuiz } from "../context/QuizContext";
import { Quiz, Question, QuestionType } from "../types/quizType";

const QuizBuilder = () => {
  const { setView, addQuiz } = useQuiz();
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: "",
    description: "",
    questions: [],
    shuffleQuestions: false,
    timeLimit: undefined,
  });

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: "",
    options: ["", ""],
    correctAnswer: 0,
    type: "single-choice",
    explanation: "",
  });

  const addQuestion = () => {
    if (
      !currentQuestion.question?.trim() ||
      !currentQuestion.options?.some((opt) => opt.trim()) ||
      currentQuestion.options.some((opt) => !opt.trim())
    ) {
      alert("Please fill in the question and all options");
      return;
    }

    const newQuestion: Question = {
      id: Date.now(),
      question: currentQuestion.question!,
      options: currentQuestion.options!.filter((opt) => opt.trim()),
      correctAnswer: currentQuestion.correctAnswer!,
      type: currentQuestion.type as QuestionType,
      explanation: currentQuestion.explanation,
    };

    setQuiz((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion],
    }));

    // Reset form
    setCurrentQuestion({
      question: "",
      options: ["", ""],
      correctAnswer: 0,
      type: "single-choice",
      explanation: "",
    });
  };

  const removeQuestion = (questionId: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId),
    }));
  };

  const addOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };

  const removeOption = (index: number) => {
    if (currentQuestion.options!.length <= 2) return;

    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index),
      correctAnswer: prev.correctAnswer === index ? 0 : prev.correctAnswer,
    }));
  };

  const updateOption = (index: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options?.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const saveQuiz = () => {
    if (
      !quiz.title?.trim() ||
      !quiz.description?.trim() ||
      !quiz.questions?.length
    ) {
      alert("Please fill in all required fields and add at least one question");
      return;
    }

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
      shuffleQuestions: quiz.shuffleQuestions || false,
      timeLimit: quiz.timeLimit,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addQuiz(newQuiz);
    setView("home");
  };

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
          Create New Quiz
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quiz Settings */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quiz Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={quiz.title || ""}
                  onChange={(e) =>
                    setQuiz((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter quiz title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={quiz.description || ""}
                  onChange={(e) =>
                    setQuiz((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="Enter quiz description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={quiz.timeLimit ? quiz.timeLimit / 60 : ""}
                  onChange={(e) =>
                    setQuiz((prev) => ({
                      ...prev,
                      timeLimit: e.target.value
                        ? parseInt(e.target.value) * 60
                        : undefined,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Optional time limit"
                  min="1"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shuffle"
                  checked={quiz.shuffleQuestions || false}
                  onChange={(e) =>
                    setQuiz((prev) => ({
                      ...prev,
                      shuffleQuestions: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="shuffle"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Shuffle questions
                </label>
              </div>
            </div>
          </div>

          {/* Question Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Question
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question *
                </label>
                <textarea
                  value={currentQuestion.question || ""}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      question: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="Enter your question"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Type
                </label>
                <select
                  value={currentQuestion.type || "single-choice"}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      type: e.target.value as QuestionType,
                      correctAnswer:
                        e.target.value === "multiple-choice" ? [] : 0,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="single-choice">Single Choice</option>
                  <option value="multiple-choice">Multiple Choice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options *
                </label>
                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder={`Option ${index + 1}`}
                    />
                    {currentQuestion.options!.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answer(s) *
                </label>
                {currentQuestion.type === "single-choice" ? (
                  <select
                    value={(currentQuestion.correctAnswer as number) || 0}
                    onChange={(e) =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        correctAnswer: parseInt(e.target.value),
                      }))
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <option key={index} value={index}>
                        {option || `Option ${index + 1}`}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="space-y-2">
                    {currentQuestion.options?.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            (
                              currentQuestion.correctAnswer as number[]
                            )?.includes(index) || false
                          }
                          onChange={(e) => {
                            const currentAnswers =
                              (currentQuestion.correctAnswer as number[]) || [];
                            const newAnswers = e.target.checked
                              ? [...currentAnswers, index]
                              : currentAnswers.filter((i) => i !== index);
                            setCurrentQuestion((prev) => ({
                              ...prev,
                              correctAnswer: newAnswers,
                            }));
                          }}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {option || `Option ${index + 1}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation (Optional)
                </label>
                <textarea
                  value={currentQuestion.explanation || ""}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      explanation: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={2}
                  placeholder="Explain why this is the correct answer"
                />
              </div>

              <button
                onClick={addQuestion}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Questions ({quiz.questions?.length || 0})
          </h2>

          {quiz.questions?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No questions added yet. Add your first question!
            </p>
          ) : (
            <div className="space-y-3">
              {quiz.questions?.map((question, index) => (
                <div
                  key={question.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {index + 1}. {question.question}
                    </h3>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Type:{" "}
                    {question.type === "single-choice"
                      ? "Single Choice"
                      : "Multiple Choice"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {question.options.length} options
                  </p>
                </div>
              ))}
            </div>
          )}

          {quiz.questions && quiz.questions.length > 0 && (
            <button
              onClick={saveQuiz}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;
