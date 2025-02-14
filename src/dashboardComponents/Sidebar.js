import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
export default function Sidebar({email}) {
  console.log("the email iofeuhiueqg,", email);
  return (
    <div className="sidebar">
      <h2>Calend-Ez</h2>
      <nav>

        <Link to={`/success/events/${email}`}>Event Types</Link>
        <Link to={`/success/appointments/${email}`}>Appointments</Link>
      </nav>
  
    </div>
  );
};
