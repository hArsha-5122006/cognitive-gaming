import React from 'react';

function Features() {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: '2.6rem', fontWeight: 700, textAlign: 'center', marginBottom: '12px' }}>
        Features
      </h1>
      <p style={{ textAlign: 'center', color: '#4a5f5a', fontSize: '1.1rem', marginBottom: '40px' }}>
        Everything you need to train your brain and track your progress.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🧠</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>13+ Cognitive Games</h3>
          <p style={{ color: '#4a5f5a' }}>Play games designed to improve memory, attention, flexibility, and processing speed.</p>
        </div>

        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>📊</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Real‑time Stats</h3>
          <p style={{ color: '#4a5f5a' }}>Track your score, accuracy, stars, and response time after every game.</p>
        </div>

        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎤</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Voice Assistant</h3>
          <p style={{ color: '#4a5f5a' }}>Say "Kara" to navigate, open games, and hear rules explained aloud.</p>
        </div>

        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>👥</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Patient & Mentor Roles</h3>
          <p style={{ color: '#4a5f5a' }}>Mentors can manage up to 20 patients and track their game performance.</p>
        </div>

        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🔐</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Secure Authentication</h3>
          <p style={{ color: '#4a5f5a' }}>Register and log in securely. Your data and progress are safe.</p>
        </div>

        <div className="card">
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>📈</div>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Performance Dashboard</h3>
          <p style={{ color: '#4a5f5a' }}>View your game history, average scores, and skill performance.</p>
        </div>
      </div>
    </div>
  );
}

export default Features;
