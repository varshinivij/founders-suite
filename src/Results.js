import React from 'react';
import {Search,Target, PieChart, TrendingUp, User } from 'lucide-react';
import './Results.css';

function Results({ searchQuery, onNewChat }) {
  const competitors = [
    { name: 'Competitor 1', trait1: true, trait2: false, trait3: false, trait4: true },
    { name: 'Competitor 2', trait1: true, trait2: true, trait3: false, trait4: true },
    { name: 'Competitor 3', trait1: true, trait2: false, trait3: true, trait4: false },
    { name: 'Competitor 4', trait1: true, trait2: false, trait3: false, trait4: false },
    { name: 'Competitor 5', trait1: true, trait2: true, trait3: false, trait4: true },
  ];

  const marketPositions = [
    { name: 'Dunkin', x: 25, y: 62, color: 'orange' },
    { name: 'Caribou', x: 38, y: 65, color: 'orange' },
    { name: 'Starbucks', x: 65, y: 68, color: 'purple' },
    { name: 'Lavazza', x: 78, y: 66, color: 'purple' },
    { name: 'Cafe Godiva', x: 85, y: 72, color: 'purple' },
    { name: 'Dutch Bros', x: 62, y: 32, color: 'orange' },
    { name: 'Folgers', x: 22, y: 28, color: 'gray' },
    { name: 'McCafe', x: 38, y: 30, color: 'gray' },
  ];

  return (
    <div className="results-page">
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

      <div className="results-content">
        <div className="results-header">
          <h2 className="main-title">Market Intelligence</h2>
          <div className="search-display">
            <Search className="search-icon" size={20} />
            <span className="search-text">{searchQuery}</span>
            <button onClick={onNewChat} className="new-chat-btn">New chat</button>
          </div>
        </div>

        <div className="cards-grid">
          <div className="card">
            <div className="card-header">
              <Target className="card-icon" size={24} />
              <h3>Competitive Comparison Matrix</h3>
            </div>
            <div className="table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th></th>
                    <th className="trait-1">Trait 1</th>
                    <th className="trait-2">Trait 2</th>
                    <th className="trait-3">Trait 3</th>
                    <th className="trait-4">Trait 4</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, idx) => (
                    <tr key={idx}>
                      <td className="competitor-name">{comp.name}</td>
                      <td className="check-cell">{comp.trait1 && <div className="checkmark">✓</div>}</td>
                      <td className="check-cell">{comp.trait2 && <div className="checkmark">✓</div>}</td>
                      <td className="check-cell">{comp.trait3 && <div className="checkmark">✓</div>}</td>
                      <td className="check-cell">{comp.trait4 && <div className="checkmark">✓</div>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <PieChart className="card-icon" size={24} />
              <h3>TAM SAM SOM</h3>
            </div>
            <div className="tam-sam-som">
              <div className="circles-container">
                <div className="circle tam-circle"></div>
                <div className="circle sam-circle"></div>
                <div className="circle som-circle"></div>
                <span className="circle-label tam-label">TAM</span>
                <span className="circle-label sam-label">SAM</span>
                <span className="circle-label som-label">SOM</span>
              </div>
              <div className="info-section">
                <div className="info-item">
                  <div className="info-dot tam-dot"></div>
                  <div>
                    <div className="info-label">TAM</div>
                    <div className="info-text">Total Addressable Market</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-dot sam-dot"></div>
                  <div>
                    <div className="info-label">SAM</div>
                    <div className="info-text">Serviceable Available Market</div>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-dot som-dot"></div>
                  <div>
                    <div className="info-label">SOM</div>
                    <div className="info-text">Serviceable Obtainable Market</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <Target className="card-icon" size={24} />
              <h3>Target Customer Profile</h3>
            </div>
            <div className="customer-profile">
              <div className="profile-avatar">
                <User size={45} />
              </div>
              <div className="profile-info">
                <h4 className="profile-name">Daisy</h4>
                <ul className="profile-details">
                  <li>64 years old</li>
                  <li>Foot pain impedes active lifestyle (hiking, golf)</li>
                  <li>Buys shoes online</li>
                  <li>Dissatisfied with failed treatments</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <TrendingUp className="card-icon" size={24} />
              <h3>Market Positioning Map</h3>
            </div>
            <div className="positioning-map">
              <div className="map-label top">HIGH QUALITY</div>
              <div className="map-label bottom">LOW QUALITY</div>
              <div className="map-label left">LOW PRICE</div>
              <div className="map-label right">HIGH PRICE</div>
              <div className="axis horizontal"></div>
              <div className="axis vertical"></div>
              {marketPositions.map((comp, idx) => (
                <div key={idx} className={`competitor-bubble ${comp.color}`} 
                  style={{ left: `${comp.x}%`, top: `${100 - comp.y}%` }}>
                  {comp.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;