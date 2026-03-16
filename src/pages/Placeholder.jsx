import React from 'react';

const Placeholder = ({ title, description = 'Module coming soon. Hook this route to real data when ready.' }) => (
  <div className="glass-card subtle-grid">
    <p className="pill" style={{ marginBottom: '12px' }}>Preview</p>
    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>{title}</h1>
    <p style={{ color: 'var(--text-muted)' }}>{description}</p>
  </div>
);

export default Placeholder;
