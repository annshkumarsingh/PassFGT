import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Passwords from "./pages/Passwords";
import About from "./pages/About";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/passwords" element={<Passwords />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
