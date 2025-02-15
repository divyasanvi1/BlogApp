import React from 'react'
import {Signup as SignupComponent} from '../components/index'
import ParticlesBackground from '../components/Particlesbackground';
function SignUp() {
  return (
    <div className='py-8'>
      <ParticlesBackground />
        <SignupComponent/>
    </div>
  )
}

export default SignUp