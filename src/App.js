import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Results from './Results';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setSubmittedQuery(searchQuery);
      setShowResults(true);
    }
  };

  const handleNewChat = () => {
    setShowResults(false);
    setSearchQuery('');
    setSubmittedQuery('');
  };

  if (showResults) {
    return <Results searchQuery={submittedQuery} onNewChat={handleNewChat} />;
  }

  return (
    <div className="app">
      <div className="background">
        <div className="gradient-glow gradient-purple"></div>
        <div className="gradient-glow gradient-orange"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="logo-container">
        <div className="logo-card">
          <div className="logo-icon">
            <div className="logo-square"></div>
            <div className="logo-letter">F</div>
          </div>
          <div className="logo-text">
            <h1 className="brand-name">Founders Suite</h1>
            <p className="brand-tagline">Tagline</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h2 className="main-title">Market Intelligence</h2>
        </div>

        <form onSubmit={handleSubmit} className="search-container">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <textarea value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter market of interest..." className="search-input" />
            <button type="submit" className="submit-btn">Submit</button>
          </div>
          <p className="subtitle">Build your future company with AI-powered market intelligence.</p>
        </form>
      </div>
    </div>
  );
}

export default App;