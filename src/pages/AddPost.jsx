import React from 'react'
import {Container,PostForm} from '../components/index'
import ParticlesBackground from '../components/Particlesbackground';

function AddPost() {
  return (
    <div className='py-8'>
      <ParticlesBackground />
    <Container>
        <PostForm/>
    </Container>
    </div>
  )
}

export default AddPost