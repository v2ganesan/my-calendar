import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import UserSetUp from "./UserSetUp.js";
import SuccessPage from "./SuccessPage";



export default function Profile() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/setup" element={<UserSetUp />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

