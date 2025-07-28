import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast"

const App = () => {
  return (
    <div className="bg-gray-950 ">
      <Toaster/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/quizes" element={<Quizes />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
