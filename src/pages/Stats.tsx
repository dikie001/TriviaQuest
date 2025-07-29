import {
    Award,
    Brain,
    Flame,
    Star,
    Target,
    TrendingUp,
    Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getStorage } from "../utils/mini_functions";

export default function Stats() {
  const [literatureScore, setLiteratureScore] = useState(0);
  const [statsData, setStatsData] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    streak: 12,
    bestScoreName: "",
    perfectScores: 0,
    totalPoints: 0,
    topics: [
      {
        name: "Literature",
        quizzes: 12,
        avgScore: literatureScore,
        color: "from-blue-500 to-purple-600",
      },
      {
        name: "Technology",
        quizzes: 8,
        avgScore: 75,
        color: "from-blue-600 to-blue-800",
      },
      {
        name: "Life Skills",
        quizzes: 15,
        avgScore: 71,
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "AI",
        quizzes: 7,    
        avgScore: 85,
        color: "from-pink-500 to-rose-600",
      },
      {
        name: "Science",
        quizzes: 5,
        avgScore: 68,
        color: "from-cyan-500 to-blue-600",
      },
      {
        name: "Math",
        quizzes: 9,
        avgScore: 79,
        color: "from-violet-500 to-purple-600",
      },

      {
        name: "Pop Culture",
        quizzes: 9,
        avgScore: 79,
        color: "from-pink-600 to-pink-800",
      },
      {
        name: "Art",
        quizzes: 9,
        avgScore: 79,
        color: "from-violet-600 to-cyan-800",
      },
      {
        name: "History",
        quizzes: 9,
        avgScore: 79,
        color: "from-gray-600 to-gray-800",
      },
      {
        name: "Random Quiz",
        quizzes: 9,
        avgScore: 79,
        color: "from-green-600 to-blue-800",
      },
    ],
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    return "text-red-400";
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const loadedData = await getStorage();
    const loadedArray = Object.values(loadedData);
    //  001
    // calculate the total quizes done
    const quizzesDone = Object.values(loadedData).reduce(
      (sum: number, obj: any) => sum + (obj.current_index ?? 0),
      0
    );
    statsData.totalQuizzes = quizzesDone;
    setStatsData((prev) => ({ ...prev, totalQuizzes: quizzesDone }));
    // 002
    // Calculate the average score
    const quizzesStarted = loadedArray.filter((items: any) => items.score > 0);
    const totalScore = quizzesStarted.reduce(
      (sum: number, obj: any) => sum + (obj.score ?? 0),
      0
    );

    const avScore = Number(((totalScore / quizzesDone) * 100).toFixed(0));
    setStatsData((prev) => ({ ...prev, averageScore: avScore }));
    // 003
    //calculate the best score
    const scores = loadedArray.map((item: any) => item.score);
    const maxScore = Math.max(...scores);
    const maxScoreArray: any = loadedArray.filter(
      (item: any) => item.score === maxScore
    );
    const maxScoreIndex = maxScoreArray[0].current_index;

    const best = Number(((maxScore / maxScoreIndex) * 100).toFixed(0));
    setStatsData((prev) => ({ ...prev, bestScore: best }));
    // 004
    // Get the perfect scores for the cetegories
    const perfectOnes = loadedArray.filter(
      (item: any) =>
        item.current_index === item.score && item.current_index !== 0
    );
    setStatsData((prev) => ({ ...prev, perfectScores: perfectOnes.length }));
    //005
    // Get the points * 10
    const allScores = scores.reduce((sum, arr) => sum + arr) * 10;
    setStatsData((prev) => ({ ...prev, totalPoints: allScores }));

    //   Load and calculate topic scores, percentages, progress etc
    setLiteratureScore(
      (loadedData.Literature.score / loadedData.Literature.current_index) * 100
    );
    statsData.topics[0].avgScore = literatureScore
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      <Navbar pageName={"Statistics"} />
      <div className="max-w-3xl mx-auto px-4 py-6 pt-14">
        {/* Header */}
        <div className="text-center mb-4 mt-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1">
            Current Stats
          </h1>
          <p className=" text-gray-400">Track your trivia mastery</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4 gap-2  mb-8">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-7 h-7 text-blue-400" />
              <h3 className="text-sm font-medium text-gray-300">
                Total Quizzes
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {statsData.totalQuizzes}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-7 h-7 text-green-400" />
              <h3 className="text-sm font-medium text-gray-300">Average</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">
              {statsData.averageScore}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-7 h-7 text-yellow-400" />
              <h3 className="text-sm font-medium text-gray-300">Best Score</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {statsData.bestScore}%
            </p>
            {/* 
            <div className="absolute  flex  left-2 text-orange-300 text-xs">
              <Dot className="text-green-400 " size={20} /> {"hel"}
            </div> */}
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              <Flame className="w-7 h-7 text-orange-400" />
              <h3 className="text-sm font-medium text-gray-300">Streak</h3>
            </div>
            <p className="text-3xl font-bold text-orange-400">
              {statsData.streak}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-7 h-7 text-purple-400" />
              <h3 className="text-sm font-medium text-gray-300">Perfect</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {statsData.perfectScores}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-7 h-7 text-cyan-400" />
              <h3 className="text-sm font-medium text-gray-300">Points</h3>
            </div>
            <p className="text-3xl font-bold text-cyan-400">
              {statsData.totalPoints.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl text-white md:text-3xl font-bold">
              Topic Mastery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsData.topics.map((topic, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-10 rounded-3xl group-hover:opacity-20 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {topic.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">
                        {topic.quizzes} quizzes
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-r ${topic.color}`}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Average Score</span>
                      <span
                        className={`text-2xl font-bold ${getScoreColor(
                          topic.avgScore
                        )}`}
                      >
                        {topic.avgScore}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 bg-gradient-to-r ${topic.color} rounded-full transition-all duration-500`}
                        style={{ width: `${topic.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
