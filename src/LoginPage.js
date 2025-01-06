import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    navigate("/success"); // Redirect to the Success page
  };

  const handleFailure = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to Calend-Ez!</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
