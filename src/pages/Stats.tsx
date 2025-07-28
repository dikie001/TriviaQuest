import React, { useState } from "react";
import {
  Trophy,
  Target,
  TrendingUp,
  Brain,
  Star,
  Award,
  Zap,
  Flame,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Stats() {
  // Dummy data - in real app this would come from localStorage
  const [statsData] = useState({
    totalQuizzes: 47,
    averageScore: 78,
    bestScore: 95,
    streak: 12,
    perfectScores: 6,
    totalPoints: 3672,
    topics: [
      {
        name: "Science",
        quizzes: 12,
        avgScore: 82,
        bestScore: 95,
        color: "from-blue-500 to-purple-600",
      },
      {
        name: "History",
        quizzes: 8,
        avgScore: 75,
        bestScore: 88,
        color: "from-amber-500 to-orange-600",
      },
      {
        name: "Sports",
        quizzes: 15,
        avgScore: 71,
        bestScore: 92,
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "Movies",
        quizzes: 7,
        avgScore: 85,
        bestScore: 94,
        color: "from-pink-500 to-rose-600",
      },
      {
        name: "Geography",
        quizzes: 5,
        avgScore: 68,
        bestScore: 81,
        color: "from-cyan-500 to-blue-600",
      },
      {
        name: "Music",
        quizzes: 9,
        avgScore: 79,
        bestScore: 89,
        color: "from-violet-500 to-purple-600",
      },
    ],
  });

  const getScoreColor = (score:number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    return "text-red-400";
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
            <h2 className="text-2xl text-white md:text-3xl font-bold">Topic Mastery</h2>
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

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Best</span>
                      <span
                        className={`font-bold ${getScoreColor(
                          topic.bestScore
                        )}`}
                      >
                        {topic.bestScore}%
                      </span>
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
