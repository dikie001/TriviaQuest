import {
  Menu,
  X,
  Play,
  Trophy,
  Settings,
  User,
  BookOpen,
  BarChart3,
  HelpCircle,
  Info,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuItems = [
    {
      icon: Play,
      label: "Quick Play",
      description: "Start a random trivia game",
    },
    { icon: BookOpen, label: "Categories", description: "Choose your topic" },
    { icon: BarChart3, label: "Statistics", description: "Your game stats" },
    { icon: Settings, label: "Settings", description: "Game preferences" },

    { icon: Info, label: "About", description: "App information" },
  ];

  const handleMenuItemClick = (label: string) => {
    console.log(`Clicked: ${label}`);
    setMenuOpen(false);
  };

  return (
    <div className="justify-between items-center px-4 flex h-16 fixed z-50 w-full backdrop-blur-xl shadow-lg">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white/20 shadow  rounded-lg flex items-center justify-center">
          <Trophy size={20} className="text-white" />
        </div>
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-2xl font-bold lg:text-3xl">
          TriviaQuest
        </h1>
      </div>

      {/* Menu toggle button */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-lg hover:bg-white/10 z-60 transition-colors duration-200 cursor-pointer"
      >
        {menuOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </div>

      {/* Menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/70 h-screen z-45 "
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Menu contents */}
      <div
        className={`fixed top-0 right-0 h-screen  w-80 bg-gradient-to-br from-gray-950  to-slate-900  transform transition-transform duration-300 ease-in-out z-50 shadow-xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu header */}
        <div className="p-6 border-b border-gray-700 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10  rounded-xl bg-white/20 flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-2xl font-bold lg:text-3xl">
                  TriviaQuest</h1>
                <p className="text-gray-400 text-sm">Test your knowledge!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item.label)}
                className="w-full flex items-center space-x-4 px-4 py-2 lg:py-4 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 text-left group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <IconComponent size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{item.label}</div>
                  <div className="text-gray-400 text-sm">
                    {item.description}
                    <hr className="w-full text-gray-600" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Menu footer */}
        <div className=" p-4 border-t mt-10 border-gray-700">
          <div className="text-center text-gray-500 text-xs">
            Version 1.0.0 • Made by dikie
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
