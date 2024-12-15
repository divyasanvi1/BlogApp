import React from 'react';

const Notfound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <h2 style={styles.errorMessage}>Page Not Found</h2>
        <p style={styles.errorDescription}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" style={styles.homeLink}>Go back to Home</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  errorCode: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: '20px',
    animation: 'bounce 1s infinite alternate',
  },
  errorMessage: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  errorDescription: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '30px',
  },
  homeLink: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#ff6347',
    color: '#fff',
    fontSize: '1rem',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
};

export default Notfound;
