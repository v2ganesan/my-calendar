import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { redirect, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // Use jwtDecode to get the user's info 
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, picture } = decoded;

      console.log("Checking user:", email);
      console.log(picture)

      const response = await fetch(`/api/users/check?email=${email}`);
      const data = await response.json();

      console.log("Server response:", data);
      console.log(picture)
      if (data.isNewUser) {
        navigate('/setup', { 
          state: { 
            email, 
            name 
          } 
        });
      } else {
        navigate('/success', {
          state: {
            email,
            name, 
            picture
          }
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleFailure = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ textAlign: "rght", marginTop: "50px" }}>
        <h1>Welcome to Calend-Ez!</h1>
      <h1>Sign Up</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
