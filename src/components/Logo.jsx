import React from 'react'
import './logo.css';

function Logo({width='100px'}) {
  return (
    <div
    style={{
      fontWeight: "bold", // Emphasize the logo
      textAlign: "center", // Centered alignment
      color: "#000", // Black for strong visibility
      fontFamily: "'Roboto', sans-serif", // Clean and modern font
      textTransform: "uppercase", // Branding with uppercase letters
      letterSpacing: "4px", // Elegant spacing
      margin: "20px auto", // Centered layout with space
      textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)", // Adds slight depth
      padding: "10px 0", // Balanced padding for all devices
    }}
    >
      <span
    style={{
      fontSize: "clamp(1.5rem, 5vw, 4rem)", // Scales dynamically
      display: "inline-block", // Aligns content properly for mobile and desktop
      lineHeight: "1.2", // Improves readability
      maxWidth: "90%", // Prevents overflow on smaller screens
      width: "fit-content", // Shrinks to content width
    }}></span>
      POSTSPHERE
    </div>
  );
}

export default Logo;
