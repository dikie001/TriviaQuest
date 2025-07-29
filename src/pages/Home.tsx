import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Quizes from "./Quizes";

// Category interface for better type safety
interface Category {
  name: string;
  icon?: string;
  description?: string;
  color?: string;
}

const Home = () => {
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Define categories with more metadata - remove duplicates
  const categories: Category[] = useMemo(
    () => [
      {
        name: "Literature",
        icon: "📚",
        description: "Books, poetry, and authors",
        color: "from-blue-500 to-purple-600",
      },
      {
        name: "Technology",
        icon: "💻",
        description: "Programming, gadgets, and innovation",
        color: "from-blue-600 to-blue-800",
      },
      {
        name: "Life Skills",
        icon: "🎯",
        description: "Practical knowledge for daily life",
        color: "from-green-600 to-green-800",
      },
      {
        name: "AI",
        icon: "🤖",
        description: "Artificial intelligence and machine learning",
        color: "from-cyan-600 to-cyan-800",
      },
      {
        name: "Science",
        icon: "🔬",
        description: "Physics, chemistry, and biology",
        color: "from-indigo-600 to-indigo-800",
      },
      {
        name: "Geography",
        icon: "🌍",
        description: "Countries, capitals, and landmarks",
        color: "from-emerald-600 to-emerald-800",
      },
      {
        name: "Math",
        icon: "🔢",
        description: "Numbers, equations, and problem solving",
        color: "from-fuchsia-600 to-indigo-900",
      },
      {
        name: "Pop Culture",
        icon: "🎬",
        description: "Movies, music, and entertainment",
        color: "from-pink-600 to-pink-800",
      },
      {
        name: "Art",
        icon: "🎨",
        description: "Painting, sculpture, and creativity",
        color: "from-violet-600 to-cyan-800",
      },
      {
        name: "History",
        icon: "⏳",
        description: "Past events and civilizations",
        color: "from-gray-600 to-gray-800",
      },
      {
        name: "Random quiz",
        icon: "",
        description: "Random quizes from random topics",
        color: "from-green-600 to-blue-800",
      },
    ],
    []
  );

  // Handle category selection
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setStartQuiz(true);
  };


  // If quiz is started, show quiz component
  if (startQuiz && selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar
          pageName={"QuizQuest"}
          // For Random quiz button
          onClick={() => setSelectedCategory("Random quiz")}
          // For category button
          onCategoryClick={() => {
            setStartQuiz(false);
            setSelectedCategory("");
          }}
        />
        {/* Back button */}
        <div className="fixed top-20 left-4 z-10"></div>
        <Quizes
          selectedCategory={selectedCategory}
          setStartQuiz={setStartQuiz}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <Navbar
        pageName={"QuizQuest"}
        // For Random quiz button
        onClick={() => {
          setSelectedCategory("Random quiz");
          setStartQuiz(true);
        }}
        // For category button
        onCategoryClick={() => {
          setStartQuiz(false);
          setSelectedCategory("");
        }}
      />
      <div className="text-center mb-6">
        <h1 className="text-5xl md:text-6xl font-black mb-2 lg:mb-4 leading-tight pt-16">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Quiz
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Universe
          </span>
        </h1>

        <p className=" text-gray-400 font-medium">
          Choose your category and test your knowledge
        </p>

        {/* Stats bar */}
        <div className="flex justify-center  mt-2 lg:mt-8 px-4">
          <div className="bg-white/5 max-w-xl backdrop-blur-xl border border-white/10 rounded-2xl px-4 w-full lg:px-8 py-4 flex items-center justify-center">
            <div className="flex items-center gap-2 md:gap-6 lg:gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {categories.length}
                </div>
                <div className="text-gray-400">Categories</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-gray-400">Questions</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">🔥</div>
                <div className="text-gray-400">Challenge</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4  pb-8 max-w-4xl mx-auto">
        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
              onClick={() => handleCategorySelect(category.name)}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Inner content container */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 rounded-3xl group-hover:opacity-20 transition-opacity duration-300`}
              ></div>
                <div className="relative z-10">
    
                {/* Category icon */}
                <div
                  className="text-3xl mb-1 lg:mb-3 transform transition-transform duration-300 
                  group-hover:scale-105"
                >
                  {category.icon}
                </div>

                {/* Category name */}
                <h2 className="text-white font-bold text-lg mb-1 group-hover:text-gray-100">
                  {category.name}
                </h2>

                {/* Category description */}
                <p
                  className="text-gray-400 text-sm leading-relaxed 
                  group-hover:text-gray-300 transition-colors duration-300"
                >
                  {category.description}
                </p>

                {/* Hover indicator */}
                <div
                  className={`absolute bottom-2 right-2 text-white text-sm 
                  transition-opacity duration-300 
                  ${
                    hoveredCategory === category.name
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  Start →
                </div>
              </div>

              {/* Animated border effect */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent 
                via-white/20 to-transparent opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Select a category to begin your quiz journey. Track your progress
            and challenge yourself!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
