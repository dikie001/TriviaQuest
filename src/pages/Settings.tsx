import React, { useState } from "react";
import { Settings, Moon, Volume2, RotateCcw, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-gray-200">
      <Navbar pageName={"Settings"} />
      <div className="px-4 pt-20 ">
        <div className="max-w-2xl mx-auto">
          {/* Settings List */}
          <div className="space-y-4 mt-4">
            {/* Dark Mode */}
            <div className=" p-4 flex items-center justify-between bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-white/5  shadow-lg">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Sound */}
            <div className=" p-4 flex items-center justify-between bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-white/5  shadow-lg">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-green-400" />
                <span className="font-medium">Sound Effects</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  soundEnabled ? "bg-green-500" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    soundEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Reset Stats */}
            <button className="w-full border border-white/5 shadow-lg bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl hover:bg-gray-700  p-4 flex items-center gap-3 transition-colors">
              <RotateCcw className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Reset Statistics</span>
            </button>

            {/* Clear Data */}
            <button className="w-full border border-white/5 shadow-lg  bg-gradient-to-br from-red-800/20 to-red-900/40 backdrop-blur-sm rounded-xl hover:bg-gray-700  p-4 flex items-center gap-3 transition-colors">
              <Trash2 className="w-5 h-5 text-red-400" />
              <span className="font-medium">Clear All Data</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500">
            <p>App Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
