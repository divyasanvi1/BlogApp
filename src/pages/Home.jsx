import React,{useEffect,useState} from 'react'
import appwriteService from "../appwrite/configuration"
import {Container, PostCard} from "../components/index"
import { Link } from 'react-router-dom';

function Home() {
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
              if(posts)
              {
                setPosts(posts.documents)
              }
        })
    },[])

    if (posts.length === 0) {
        return (
          <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap justify-center">
              <div className="p-2 w-full">
                
                <h1 className="text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 ease-in-out">
                  Unlock Exclusive Content !
                </h1>
                
                
                <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto leading-relaxed tracking-wide">
                  Discover a world of exclusive posts, in-depth articles, and expert insights available only to our members. 
                  🚀 <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Join our community today</Link> and start reading content tailored just for you.
                </p>
                
                
                <div className="mt-8">
                  <Link to="/login">
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out">
                     Explore 🚀
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
        
          

        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home