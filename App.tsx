import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Needs from './pages/Needs';
import AIPlanner from './pages/AIPlanner';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/needs" element={<Needs />} />
            <Route path="/planner" element={<AIPlanner />} />
          </Routes>
        </main>
        <ChatWidget />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
