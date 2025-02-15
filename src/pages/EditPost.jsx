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
    

  return post ? (
   <div className='py-8'>
     <ParticlesBackground />
    <Container>
        <PostForm post={post}/>
    </Container>
   </div>
  ): null
}

export default EditPost