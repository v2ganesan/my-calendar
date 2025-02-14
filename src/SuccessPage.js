import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './dashboardComponents/Sidebar';
import Header from './dashboardComponents/Header'
import './dashboardComponents/dashboard.css';
import './createEventComponents/NewEventForm.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsDashboard from './dashboardComponents/EventsDashboard/EventsDashboard';
import AppointmentsDashboard from './dashboardComponents/AppointmentsDashboard/ApptsDash';


//import { googleLogout } from '@react-oauth/google';
//import { useNavigate, useLocation } from 'react-router-dom';


export default function EventsPage() {
  //const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const name = queryParams.get("name");
  const picture = queryParams.get("picture");

  console.log('email', email);
  console.log('name', name);

  //const name = localStorage.getItem("name");
  //const email = localStorage.getItem("email");
  //const picture = localStorage.getItem("picture");

  return (

      <div className="dashboard">
        <Header name={name} picture={picture} />
        <div className="dashboard-layout">
          <Sidebar email={email} />

          <div className="main-content">
          <Routes>
            <Route path="events/:email" element={<EventsDashboard />} />
            <Route path="appointments/:email" element={<AppointmentsDashboard />} />
          </Routes>        
          </div>
        </div>
      </div>
  );
}
