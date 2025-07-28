import { Brain, Target, Trophy, Zap } from "lucide-react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white">
      <Navbar pageName={"About"} />
      <div className="px-4 pt-20 ">
        <div className="text-center max-w-3xl">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Trivia App</h1>
          <p className="text-xl text-gray-300 mb-8">
            Test your knowledge across multiple topics. Track your progress and
            challenge yourself with every quiz.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Track Progress</h3>
              <p className="text-sm text-gray-400">
                Monitor your scores and improvements
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Multiple Topics</h3>
              <p className="text-sm text-gray-400">
                Science, history, sports, and more
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Offline Ready</h3>
              <p className="text-sm text-gray-400">Play anywhere, anytime</p>
            </div>
          </div>

          <div className="text-gray-400 space-y-1 text-xs pb-4">
            <p>Version 1.0.0</p>
            <p>Built for knowledge enthusiasts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
