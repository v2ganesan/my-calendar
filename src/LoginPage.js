import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "rght", marginTop: "50px" }}>
        <h1>Welcome to Calend-Ez!</h1>
      <h1>Sign Up</h1>
        <button onClick={() => { window.location.href = 'http://localhost:3001/api/auth/google'; }}>
          Sign In
      </button>
      </div>
    </GoogleOAuthProvider>
  );
}
