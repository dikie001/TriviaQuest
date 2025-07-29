import {
  BarChart3,
  BookOpen,
  Info,
  Menu,
  Play,
  Settings,
  Trophy
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onClick?: () => void;
  onCategoryClick?: () => void;
  pageName?: string;
}

const Navbar = ({ onClick, onCategoryClick, pageName }: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Menu configuration with enhanced styling
  const menuItems = [
    {
      icon: Play,
      label: "Quick Play",
      description: "Start a random trivia game",
      to: "/",
      color: "from-green-800 to-emerald-950",
    },
    {
      icon: BookOpen,
      label: "Categories",
      description: "Choose your topic",
      to: "/",
      color: "from-blue-800 to-indigo-950",
    },
    {
      icon: BarChart3,
      label: "Statistics",
      description: "Your game stats",
      to: "/stats",
      color: "from-purple-800 to-pink-950",
    },
    {
      icon: Settings,
      label: "Settings",
      iconStyle: "animate-spin",
      description: "Game preferences",
      to: "/settings",
      color: "from-orange-800 to-red-950 ",
    },
    {
      icon: Info,
      label: "About",
      description: "App information",
      to: "/about",
      color: "from-cyan-800 to-teal-950",
    },
  ];

  const handleMenuItemClick = (label: string) => {
    setMenuOpen(false);
    if (label === "Quick Play") onClick?.();
    if (label === "Categories") onCategoryClick?.();
  };

  return (
    <div className={`justify-between items-center px-6 flex h-18 fixed z-50 w-full backdrop-blur-xl shadow-xl`}>
      {/* Brand Section */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-800 to-purple-950 rounded-xl flex items-center justify-center shadow-lg">
          <Trophy size={22} className="text-white" />
        </div>
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-2xl font-bold">
          {pageName || "TriviaQuest"}
        </h1>
      </div>

      {/* Menu Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-xl   hover:bg-white/10  shadow-lg"
      >
        <Menu size={22} className="text-white" />
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 h-screen bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-75 lg:w-100 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 border-l border-white/10 z-50 shadow-xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-out`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-600/10 to-purple-600/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-800 to-purple-950 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy size={26} className="text-white" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent text-2xl font-bold">
                TriviaQuest
              </h1>
              <p className="text-gray-400 text-sm font-medium">
                Test your knowledge!
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.to);
                  handleMenuItemClick(item.label);
                }}
                className="w-full flex items-center space-x-4 space-y-2 px-4 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 shadow-lg group"
              >
                {/* Icon with gradient background */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg`}
                >
                  <IconComponent
                    size={22}
                    className={`${item.iconStyle} text-white`}
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-lg">
                    {item.label}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-gray-900/50">
          <div className="text-center">
            <div className="text-gray-400 text-sm font-medium">
              Version 1.0.0
            </div>
            <div className="text-gray-500 text-xs">Made with ❤️ by dikie</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
