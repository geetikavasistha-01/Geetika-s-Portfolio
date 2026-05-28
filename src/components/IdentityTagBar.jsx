import React from 'react';
import './IdentityTagBar.css';

export default function IdentityTagBar() {
  return (
    <div className="identity-tag-bar">
      <div className="os-dots">
        <div className="os-dot dot-pink"></div>
        <div className="os-dot dot-yellow"></div>
      </div>
      <div className="tag-badges">
        <span className="badge badge-pink">AI Engineer</span>
        <span className="badge badge-blue">Data Scientist</span>
        <span className="badge badge-green">Climate-tech</span>
      </div>
    </div>
  );
}
