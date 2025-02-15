import React from 'react'
import {Login as LoginComponent} from '../components/index'
import ParticlesBackground from '../components/Particlesbackground';

function Login() {
  return (
    <div className='py-8'>
    <ParticlesBackground />
      <LoginComponent />
  </div>
  )
}

export default Login