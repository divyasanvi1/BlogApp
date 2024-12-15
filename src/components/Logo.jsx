import React from 'react';
import './logo.css'; // Ensure your styles are imported for additional custom styling

function Logo() {
  return (
    <div
      style={{
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "'Roboto', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '10px auto', // Reduced margin for better spacing
        padding: '5px 0', // Slightly smaller padding
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)', // Subtle shadow
      }}
    >
      <span
        style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)', // Reduced size for better desktop scaling
          display: 'inline-block',
          background: 'linear-gradient(90deg, #007BFF, #0056b3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.2',
          maxWidth: '100%',
          width: 'fit-content',
        }}
      >
        PostSphere
      </span>
    </div>
  );
}

export default Logo;
