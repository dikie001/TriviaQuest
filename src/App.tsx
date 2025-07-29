import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

// Define the BeforeInstallPromptEvent type
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
import { Toaster } from "react-hot-toast";
import { ArrowRight, Download, Shield, X, Zap } from "lucide-react";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import SettingsPage from "./pages/Settings";
import About from "./pages/About";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();

      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(
      outcome === "accepted"
        ? "🙌 Installation accepted!"
        : "😬 Installation dismissed."
    );
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-pink-600 via-purple-800 to-purple-950 ">
      <Toaster />
      {deferredPrompt && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm">
          <div className="bg-black/70 backdrop-blur-2xl rounded-3xl p-6 border border-purple-500/30 shadow-2xl shadow-purple-900/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Download className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl leading-tight">
                  Install TriviaQuest
                </h3>
                <p className="text-purple-200/90 text-sm">
                  Access anytime, anywhere
                </p>
              </div>
              <button
                onClick={() => setDeferredPrompt(null)}
                className="text-purple-300 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4 text-sm text-purple-200/80">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Instant access</span>
              <Shield className="w-4 h-4 text-green-400" />
              <span>Safe & secure</span>
            </div>

            <button
              onClick={handleInstallClick}
              className="
            w-full group
            bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600
            hover:from-purple-400 hover:via-indigo-400 hover:to-purple-500
            text-white font-semibold
            px-6 py-3
            rounded-2xl
            shadow-lg shadow-purple-500/30
            hover:shadow-purple-400/40
            transform hover:scale-[1.02]
            transition-all duration-300
            border border-purple-400/40
            hover:border-purple-300/60
            flex items-center justify-center gap-2
          "
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Install Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
