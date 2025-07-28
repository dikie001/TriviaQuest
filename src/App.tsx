import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast"
import Stats from "./pages/Stats";
import SettingsPage from "./pages/Settings";
import About from "./pages/About";

const App = () => {
  return (
    <div className="bg-gray-950 ">
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
