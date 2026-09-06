import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { VoiceProvider, useVoice } from "./context/VoiceAssistantContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MemoryGame from "./games/MemoryGame/MemoryGame";
import SequenceRecall from "./games/SequenceRecall/SequenceRecall";
import AttentionGame from "./games/AttentionGame/AttentionGame";
import StroopEffect from "./games/StroopEffect/StroopEffect";
import NBack from "./games/NBack/NBack";
import VisualSearch from "./games/VisualSearch/VisualSearch";
import ChoiceReaction from "./games/ChoiceReaction/ChoiceReaction";
import CardSorting from "./games/CardSorting/CardSorting";
import TrailMaking from "./games/TrailMaking/TrailMaking";
import MentalRotation from "./games/MentalRotation/MentalRotation";
import DigitSpan from "./games/DigitSpan/DigitSpan";
import FlankerTask from "./games/FlankerTask/FlankerTask";
import PatternMemory from "./games/PatternMemory/PatternMemory";

import { getGameRule } from "./utils/gameRules";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "80px 30px", textAlign: "center" }}>
          <h1 style={{ color: "#c62828" }}>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setCommandHandler, speak } = useVoice();

  useEffect(() => {
    setCommandHandler((cmd) => {
      const gameRoutes = {
        'memory match': '/games/memory',
        'sequence recall': '/games/sequence',
        'target attention': '/games/attention',
        'stroop effect': '/games/stroop',
        'n-back': '/games/nback',
        'visual search': '/games/visualsearch',
        'choice reaction': '/games/choicereaction',
        'card sorting': '/games/cardsorting',
        'trail making': '/games/trailmaking',
        'mental rotation': '/games/mentalrotation',
        'digit span': '/games/digitspan',
        'flanker task': '/games/flanker',
        'pattern memory': '/games/patternmemory',
      };
      const path = location.pathname;
      let response = '';

      let matchedGame = null;
      for (const [name, route] of Object.entries(gameRoutes)) {
        if (cmd.includes(name) || cmd.includes(name.replace(' ', ''))) {
          matchedGame = name;
          break;
        }
      }

      const isExplain = cmd.includes('explain') || cmd.includes('how to play') || cmd.includes('rules') || cmd.includes('tell me');

      if (matchedGame) {
        navigate(gameRoutes[matchedGame]);
        response = `Opening ${matchedGame}.`;
      } else if (isExplain) {
        const currentGame = Object.keys(gameRoutes).find(key => gameRoutes[key] === path);
        if (currentGame) {
          const rule = getGameRule(currentGame);
          response = `Rules for ${currentGame}: ${rule}`;
        } else {
          response = 'You are not on a game page. Please go to a game first.';
        }
      } else if (cmd.includes('home')) {
        navigate('/');
        response = 'Navigating to home.';
      } else if (cmd.includes('games')) {
        navigate('/games');
        response = 'Navigating to games.';
      } else if (cmd.includes('dashboard')) {
        navigate('/dashboard');
        response = 'Navigating to dashboard.';
      } else if (cmd.includes('help')) {
        response = 'You can say: "explain how to play", "go to home", "go to games", "go to dashboard", "open [game name]", or "help".';
      } else {
        response = 'I did not understand. Say "help" for a list of commands.';
      }
      speak(response);
    });
  }, [navigate, location, speak, setCommandHandler]);

  return (
    <>
      <ScrollToTop />
      <div className="app-container">
        <Navbar user={user} logout={logout} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/games" element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            } />
            <Route path="/games/memory" element={
              <ProtectedRoute>
                <ErrorBoundary><MemoryGame /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/sequence" element={
              <ProtectedRoute>
                <ErrorBoundary><SequenceRecall /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/attention" element={
              <ProtectedRoute>
                <ErrorBoundary><AttentionGame /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/stroop" element={
              <ProtectedRoute>
                <ErrorBoundary><StroopEffect /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/nback" element={
              <ProtectedRoute>
                <ErrorBoundary><NBack /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/visualsearch" element={
              <ProtectedRoute>
                <ErrorBoundary><VisualSearch /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/choicereaction" element={
              <ProtectedRoute>
                <ErrorBoundary><ChoiceReaction /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/cardsorting" element={
              <ProtectedRoute>
                <ErrorBoundary><CardSorting /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/trailmaking" element={
              <ProtectedRoute>
                <ErrorBoundary><TrailMaking /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/mentalrotation" element={
              <ProtectedRoute>
                <ErrorBoundary><MentalRotation /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/digitspan" element={
              <ProtectedRoute>
                <ErrorBoundary><DigitSpan /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/flanker" element={
              <ProtectedRoute>
                <ErrorBoundary><FlankerTask /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="/games/patternmemory" element={
              <ProtectedRoute>
                <ErrorBoundary><PatternMemory /></ErrorBoundary>
              </ProtectedRoute>
            } />
            <Route path="*" element={<div style={{ padding: "80px", textAlign: "center" }}><h1>404</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VoiceProvider>
          <AppContent />
        </VoiceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
