import React,{useState} from 'react'
import authService from '../../appwrite/auth'
import "./cover.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particlesbackground from "../Particlesbackground"

const Forget=()=>{
      const [email,setEmail]=useState('');

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await authService.recoverPassword(email);
            toast.success('Recovery email sent! Check your inbox.');
            setEmail('');
        }
        catch (error) {
          toast.error('Failed to send recovery email. Please try again.');
        }
      };
    return( 
      <div className="relative min-h-screen flex flex-col">
          {/* Always render Particle Background */}
          <Particlesbackground />
      
          <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
            <div className="py-8 w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
              
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-black-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
              className="w-full mt-1 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg shadow-sm focus:ring-gray-400 focus:border-gray-400 appearance-none autofill:bg-transparent"
              style={{
                WebkitBoxShadow: "0 0 0px 1000px transparent inset", 
                WebkitTextFillColor: "black",
                backgroundClip: "text",
                appearance: "none",
              }}
            />
             </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition duration-300">
                  Send Recovery Email
                </button>
              </form>
            </div>
          </div>
          
          <ToastContainer />
        </div>
    );
};

export default Forget;