import { useEffect, useRef, useState } from "react";
import AllQuestions from "../assets/quiz_jsons/Quiz_1.json";
import toast from "react-hot-toast";
import { getStorage } from "../utils/mini_functions";
// import { useNavigate } from "react-router-dom";
const TRIVIA_KEY = "trivia-quest-storage";

type Question = {
  category: string;
  question: string;
  options: Record<string, string>;
  answer?: string;
  explanation?: string;
};

type Props = {
  selectedCategory: string;
  setStartQuiz: (value: React.SetStateAction<boolean>) => void;
};

const Quizes = ({ selectedCategory,setStartQuiz }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const scoreRef = useRef<number>(0);
  const indexRef = useRef<number>(0); //for storage purposes only
  const lastQuestionRef = useRef<boolean>(false)

  // const navigate = useNavigate();
  const trivia: Record<string, any> = {
    Literature: { current_index: 0, score: 0, done: false },
    Technology: { current_index: 0, score: 0, done: false },
    Life_skills: { current_index: 0, score: 0, done: false },
    Science: { current_index: 0, score: 0, done: false },
    Geography: { current_index: 0, score: 0, done: false },
    Math: { current_index: 0, score: 0, done: false },
    Pop_culture: { current_index: 0, score: 0, done: false },
    Art: { current_index: 0, score: 0, done: false },
    AI: { current_index: 0, score: 0, done: false },
    History: { current_index: 0, score: 0, done: false },
    Random_quiz: { current_index: 0, score: 0, done: false },
  };

  useEffect(() => {
    loadStorage();
  }, []);

  //load everything from storage
  const loadStorage = async () => {
    const loadedData = await getStorage();
    setCurrentIndex(loadedData[selectedCategory].current_index);
    indexRef.current = loadedData[selectedCategory].current_index; //for storage purposes only
  };

  //save currentIndex and score to storage
  const saveProgress = async () => {
    // Fetch current data
    const fetchedData = localStorage.getItem(TRIVIA_KEY);
    const parsedData = fetchedData ? JSON.parse(fetchedData) : [];
    // Update to include latest data
    const updatedData = {
      ...parsedData,
      [selectedCategory]: {
        ...parsedData[selectedCategory],
        current_index: indexRef.current,
        score: scoreRef.current,
        done:lastQuestionRef.current,
      },
    };
    localStorage.setItem(TRIVIA_KEY, JSON.stringify(updatedData));
  };

  // Filter questions by category
  const filteredQuestions = AllQuestions.filter(
    (question: Question) => question.category === selectedCategory
  );

  const currentQuestion = filteredQuestions[currentIndex];
  const hasQuestions = filteredQuestions.length > 0;
  const isLastQuestion = currentIndex === filteredQuestions.length - 1;

  // Handle answer selection
  const handleAnswerSelect = (optionKey: string) => {
    trivia[selectedCategory].current_index = 45;

    if (showResult) return;
    setSelectedAnswer(optionKey);
    setShowResult(true);

    const correctAnswer = currentQuestion.answer;
    const isCorrect = optionKey === correctAnswer;

    if (isCorrect) {
      scoreRef.current += 1;
    }



    // Enhanced toast with modern styling
    toast.custom(
      (t) => (
        <div
          className={`flex items-start gap-4 p-6 rounded-3xl shadow-2xl transition-all duration-500 transform backdrop-blur-xl border max-w-md ${
            t.visible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-6 scale-95"
          } ${
            isCorrect
              ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-100"
              : "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-400/30 text-rose-100"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isCorrect ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            {isCorrect ? "✓" : "✗"}
          </div>
          <div>
            <div className="font-semibold mb-1">
              {isCorrect ? "Correct!" : "Incorrect"}
            </div>
            <div className="text-sm opacity-90 leading-relaxed">
              {currentQuestion.explanation}
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );

    setTimeout(() => {
      handleNext();
    }, 4500);
  };

  // Navigate to next question
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      indexRef.current += 1;
      setSelectedAnswer(null);
      setShowResult(false);
    }
    if(isLastQuestion){
      lastQuestionRef.current = true
    }
    saveProgress();
  };

  // Navigate to previous question
  // const handlePrevious = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex((prev) => prev - 1);
  //     setSelectedAnswer(null);
  //     setShowResult(false);
  //   }
  // };

  if (!hasQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
        <div className="text-center py-8 px-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <span className="text-4xl">🤔</span>
          <h2 className="text-2xl font-bold mb-3 text-white">
            No Questions Found
          </h2>
          <p className="text-slate-300 max-w-sm">
            {selectedCategory} questions are not currently available. Try selecting a different category.
          </p>

          <button
            onClick={() => setStartQuiz(false)}
            className="mt-2 cursor-pointer bg-gradient-to-r from-cyan-800 via-blue-800 to-purple-800 py-3 px-6 shadow rounded-xl font-medium text-white active:ring ring-purple-600 "
          >
            Categories
          </button>
        </div>
      </div>
    );
  }
  if(isLastQuestion){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
        <div className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <span className="text-4xl">🤔</span>
          <h2 className="text-2xl font-bold mb-3 text-white">
            No Questions Found
          </h2>
          <p className="text-gray-400 max-w-sm text-sm">
            {selectedCategory} questions are currently not available. Click the button below to select different
            category.
          </p>
          <button onClick={()=>setStartQuiz(false)} className="mt-2 cursor-pointer bg-gradient-to-r from-cyan-800 via-blue-800 to-purple-800 py-3 px-6 shadow rounded-xl font-medium text-white active:ring ring-purple-600 ">
            Categories
          </button>
        </div>
      </div>
    );
  }

  const correctAnswer = currentQuestion.answer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-slate-950 p-4 pt-20">
      <div className="max-w-3xl mx-auto">
        {/* Question Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="p-4">
            {/* Category Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-100">
                {currentQuestion.category}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold leading-8 lg:mb-6  text-white">
              {currentQuestion.question}
            </h2>
          </div>
          {/* Answer Options */}
          <div className="px-4 pb-6 space-y-2">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
              const isSelected = selectedAnswer === key;
              const isCorrect = key === correctAnswer;
              const isWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(key)}
                  className={`group w-full text-left px-4 py-2 shadow-lg shadow-black/20 rounded-2xl transition-all duration-300 transform border ${
                    showResult && isCorrect
                      ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400 shadow-lg shadow-emerald-500/25 scale-[1.02]"
                      : isWrong
                      ? "bg-gradient-to-r from-rose-500/20 to-pink-500/20 border-rose-400 shadow-lg shadow-rose-500/25"
                      : showResult
                      ? "bg-slate-800/30 border-slate-600 opacity-60"
                      : "bg-white/5 border-slate-600 hover:border-purple-400 hover:bg-white/10 hover:scale-[1.01] hover:shadow-lg hover:shadow-purple-500/25"
                  } ${!showResult ? "cursor-pointer" : "cursor-default"}`}
                  disabled={showResult}
                >
                  <div className="flex items-center">
                    {/* Option Letter */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold mr-4 transition-all ease-in-out duration-300 ${
                        showResult && isCorrect
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-800 text-white shadow-lg shadow-black/20"
                          : isWrong
                          ? "bg-gradient-to-br from-rose-500 to-rose-800 text-white shadow-lg shadow-black/20"
                          : showResult
                          ? "bg-slate-600 text-slate-300"
                          : "bg-gradient-to-br from-black/20 to-white/30 shadow-lg shadow-black/20 text-white group-hover:shadow-lg"
                      }`}
                    >
                      {key}
                    </div>

                    {/* Option Text */}
                    <span
                      className={`flex-1 text-lg ${
                        showResult && isCorrect
                          ? "text-emerald-100 font-medium"
                          : isWrong
                          ? "text-rose-100"
                          : showResult
                          ? "text-slate-400"
                          : "text-white group-hover:text-purple-100"
                      }`}
                    >
                      {value}
                    </span>

                    {/* Result Icons */}
                    {showResult && isCorrect && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center ml-4 animate-bounce">
                        <span className="text-white font-bold">✓</span>
                      </div>
                    )}
                    {isWrong && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-900 flex items-center justify-center ml-4 animate-pulse">
                        <span className="text-white font-bold">✗</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizes;
