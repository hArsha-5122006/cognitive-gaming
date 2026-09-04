import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Dashboard from "./pages/Dashboard";

import MemoryGame from "./games/MemoryGame/MemoryGame";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Games Page */}
        <Route path="/games" element={<Games />} />

        {/* Memory Game */}
        <Route
          path="/games/memory"
          element={<MemoryGame />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;