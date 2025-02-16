import React,{useEffect,useState} from 'react'
import {Container,PostForm} from "../components/index"
import AppwriteService from "../appwrite/configuration"
import { useNavigate,useParams } from 'react-router-dom'
import ParticlesBackground from '../components/Particlesbackground';

function EditPost() {
    const [post,setPosts]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug)
        {
            AppwriteService.getPost(slug).then((post)=>
                {
                    if (post)
                        {
                            setPosts(post)
                        }
                }
            )
        }
        else
        {
            navigate("/")
        }
    },[slug,navigate])
    

    return (
        <div className="relative min-h-screen flex flex-col">
          {/* Always render Particle Background */}
          <ParticlesBackground />
      
          {post ? (
            <div className="py-8 relative z-10">
              <Container>
                <PostForm post={post} />
              </Container>
            </div>
          ) : (
            // Show a loading message instead of a blank screen
            <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500"></div>
              <p className="mt-2 text-gray-500 text-sm">Loading post...</p>
            </div>
          )}
        </div>
      );
      
}

export default EditPost