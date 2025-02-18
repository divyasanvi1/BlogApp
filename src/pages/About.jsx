import React from "react";
import { useNavigate } from "react-router-dom";
import Particlesbackground from "../components/Particlesbackground"; // Ensure correct import path

const AboutUs = () => {
  const navigate = useNavigate(); // Navigation hook

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <Particlesbackground />
      <div className="relative z-10 max-w-3xl w-full bg-gray-800/60 backdrop-blur-md p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-grey-400">About PostSphereX</h1>
        <p className="mt-4 text-lg text-gray-300 text-center">
          Welcome to PostSphereX, the ultimate platform for sharing and discovering ideas. 
          Our mission is to connect people and create a space where everyone can express 
          themselves freely through blogs, multimedia, and discussions.
        </p>

        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-grey-300">Why Choose PostSphereX?</h2>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li>✅ Edit & Publish Blogs** – A seamless editing experience with rich text formatting.</li>
            <li>✅ Download Blogs** – Users can download blogs for offline reading.</li>
            <li>✅ Email Verification** – Secure your account with verified email login.</li>
            <li>✅ Real-Time Updates** – Instant posting and community interactions.</li>
            <li>✅ Upcoming Features** – Account deletion with data removal, cloud storage, and collaboration tools.</li>
          </ul>
        </div>

        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-grey-300">How to Use PostSphereX?</h2>
          <ol className="mt-3 list-decimal list-inside text-gray-300 space-y-2">
            <li><strong>Sign Up/Login:</strong> Register with a valid email and verify your account.</li>
            <li><strong>Dashboard:</strong> Access all features, including post creation, editing, and analytics.</li>
            <li><strong>Create Posts:</strong> Use our rich text editor to write and customize your blogs.</li>
            <li><strong>Download Content:</strong> Save your favorite posts for offline use.</li>
          </ol>
        </div>

        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2 bg-black-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Contact Us
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400">
          🚀 Join us on PostSphereX and start sharing your ideas today!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
