import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactUs = () => {
  
    const email = "sanvidiv22@gmail.com";

    const handleEmailClick = () => {
      toast.info("Redirecting to email...");
    };
  return (
    <div className="contact" style={{ backgroundColor: '#f4f4f9', padding: '40px 0' }}>
    <div className="block-contact" style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: '20px' }}>
        Contact Us 📩
      </h1>
      <div className="contact-info">
        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555', margin: '10px 0' }}>
          If you have any questions, suggestions, or feedback, feel free to reach out to us!
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555', margin: '10px 0' }}>
          <strong>Phone:</strong> +91 9799033486
        </p>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555', margin: '10px 0' }}>
          <strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#007bff', textDecoration: 'none' }}>{email}</a>
        </p>
      </div>
      <div className="contact-action">
        <a
          href={`mailto:${email}`}
          className="login-button"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '1rem',
            borderRadius: '5px',
            transition: 'background-color 0.3s'
          }}
          onClick={handleEmailClick}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Send Email
        </a>
      </div>
      <div className="additional-info">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0', color: '#333' }}>
          Stay Connected!
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#555', margin: '10px 0' }}>
          We value your feedback and strive to improve your experience.
        </p>
      </div>
    </div>
    <ToastContainer />
  </div>
  
  );
};

export default ContactUs;