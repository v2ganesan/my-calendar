import React from 'react';
import './dashboard.css'
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";




export default function Header({ name, profilePicture }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // go back to the home page 
        googleLogout();
        navigate("/", { state: null });
      };
      
    return (
      <div className="header-container">
        <button onClick={handleLogout}> Logout </button>
        <img
          src={profilePicture}
          alt="pfp"
          className="profile-picture"
        />
        <span className="user-name">{name}</span>
      </div>
    );
  }
  