import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    // Extract form data
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    // Check if passwords match
    if (password !== password2) {
      alert("Passwords do not match!");
      return;
    }

    // Navigate to setup page with form data
    navigate("/setup", {
      state: { name, email },
    });
  };

  return (
    <div style={{ textAlign: "left", marginTop: "100px", padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label>
          Full Name
          <input type="text" name="name" placeholder="John Doe" required style={{ width: "100%", padding: "10px", marginTop: "5px" }} />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="your@email.com" required style={{ width: "100%", padding: "10px", marginTop: "5px" }} />
        </label>
        <label>
          Password
          <input type="password" name="password" placeholder="Enter your password" required style={{ width: "100%", padding: "10px", marginTop: "5px" }} />
        </label>
        <label>
          Confirm Password
          <input type="password" name="password2" placeholder="Confirm your password" required style={{ width: "100%", padding: "10px", marginTop: "5px" }} />
        </label>
        <label>
          <input type="checkbox" name="updates" style={{ marginRight: "10px" }} />
          I want to receive updates via email.
        </label>
        <button type="submit" style={{ padding: "10px", fontSize: "16px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account? <a href="/login" style={{ color: "#007BFF" }}>Sign in</a>
      </p>
    </div>
  );
};

export default SignUp;
