import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ParticlesBackground from '../components/Particlesbackground';



export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    console.log("userData in post:", userData);

    const userIdRedux = userData?.userData?.$id || userData?.$id;
    console.log("userIdRedux in submit2:", userIdRedux);
    const isAuthor = post && userData ? post.userId === userIdRedux : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        
        <ParticlesBackground />
    
        {post ? (
          <div className="py-8 flex justify-center relative z-10">
            
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 inline-block">
              
             
              <div className="relative w-full max-w-[600px]">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-xl object-cover w-full h-auto"
                />
    
               
                {isAuthor && (
                  <div className="absolute top-3 right-3 flex space-x-2 bg-opacity-50 bg-black p-2 rounded-md">
                    <Link to={`/edit-post/${post.$id}`}>
                      <Button bgColor="bg-green-500" className="px-3 py-1 text-sm text-white">Edit</Button>
                    </Link>
                    <Button bgColor="bg-red-500" className="px-3 py-1 text-sm text-white" onClick={deletePost}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
    
              
              <div className="text-center mt-4 px-4">
                <h1 className="text-2xl font-bold break-words">{post.title}</h1>
              </div>
    
              
              <div className="mt-4 px-4 text-justify break-words max-w-[600px]">
                {parse(post.content)}
              </div>
    
            </div>
          </div>
        ) : (
          // Show a loading message instead of a blank screen
          <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500"></div>
                    <p className="mt-2 text-gray-500 text-sm">Loading stories...</p>
                </div>
        )}
      </div>
    );
    
}