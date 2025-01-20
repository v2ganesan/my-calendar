import React from 'react';
import Sidebar from './dashboardComponents/Sidebar';
import EventCard from './dashboardComponents/EventCard';
import Header from './dashboardComponents/Header'
import './dashboardComponents/dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';


export default function EventsPage() {
  const location = useLocation();
  const { email, name , picture } = location.state || {};

  return (
    <div className="dashboard">
      <Header name={name} picture={picture} />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="main-content">
          <h1>Event types</h1>
          <EventCard />
          <EventCard />
        </main>
      </div>
    </div>
  );
}
