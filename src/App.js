import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import UserSetUp from "./UserSetUp.js";
import SuccessPage from "./SuccessPage";
import SignUp from "./SignUp.js";
import BookingPage from "./bookingPage/BookingPage";



export default function Profile() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setup" element={<UserSetUp />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/booking/:email/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

