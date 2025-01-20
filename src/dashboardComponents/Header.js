import React from 'react';
import './dashboard.css'

export default function Header({ name, profilePicture }) {
    return (
      <div className="header-container">
        <img
          src={profilePicture}
          alt="pfp"
          className="profile-picture"
        />
        <span className="user-name">{name}</span>
      </div>
    );
  }
  