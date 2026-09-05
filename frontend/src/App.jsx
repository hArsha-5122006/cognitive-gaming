import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Dashboard from "./pages/Dashboard";

import MemoryGame from "./games/MemoryGame/MemoryGame";
import SequenceRecall from "./games/SequenceRecall/SequenceRecall";

import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Sequence page error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "80px 30px", textAlign: "center", background: "#fff5f5", minHeight: "600px", color: "#222" }}>
          <h1 style={{ color: "#c62828" }}>Sequence Recall Error</h1>
          <p>The Sequence Recall component has an error.</p>
          <pre style={{ margin: "30px auto", padding: "20px", maxWidth: "900px", overflowX: "auto", background: "#fff", border: "1px solid #ddd", borderRadius: "10px", textAlign: "left", whiteSpace: "pre-wrap" }}>
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route
              path="/games/sequence"
              element={
                <ErrorBoundary>
                  <SequenceRecall />
                </ErrorBoundary>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<div style={{ padding: "80px", textAlign: "center" }}><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
