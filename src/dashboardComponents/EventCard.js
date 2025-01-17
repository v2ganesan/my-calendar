import React from 'react';
import './dashboard.css';

export default function EventCard() {
    return (
      <div className="event-card">
        <div className="event-card-header">
          <input type="checkbox" />
          <span className="event-title">30 Minute Meeting</span>
          <span className="settings-icon">⚙️</span>
        </div>
        <div className="event-card-body">
          <p><strong>30 min</strong>, One-on-One</p>
          <a href="#" className="booking-page-link">View booking page</a>
        </div>
        <div className="event-card-footer">
          <button className="copy-link">Copy link</button>
          <button className="share-button">Share</button>
        </div>
      </div>
    );
  }
  