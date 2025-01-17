import React from 'react';
import Sidebar from './dashboardComponents/Sidebar';
import EventCard from './dashboardComponents/EventCard';
import './dashboardComponents/dashboard.css';

export default function EventsPage() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <h1>Event types</h1>
        <EventCard />
        <EventCard /> {/* Add more placeholders if needed */}
      </main>
    </div>
  );
}