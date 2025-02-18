import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParticlesBackground from './components/Particlesbackground';

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()


  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)
      {
        dispatch(login({userData}))
      }
      else
      {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

   return !loading ? (
    
    <div className="relative min-h-screen flex flex-col">
      <ToastContainer 
       position="top-right" 
       autoClose={3000} 
       newestOnTop 
       limit={5}  
       style={{ zIndex: 9999 }} // Ensures toast is always on top
      />
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
      
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        
      </div>
    </div>)
   : null
}

export default App
