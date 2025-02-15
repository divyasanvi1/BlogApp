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

    return post ? (
      <div className="py-8 flex justify-center">
      <ParticlesBackground />
      
      {/* Post Card (Grows Dynamically) */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 inline-block">
        
        {/* Image Container */}
        <div className="relative w-full max-w-[600px]">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl object-cover w-full h-auto"
          />
    
          {/* Edit & Delete Buttons (Inside Image) */}
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
    
        {/* Title */}
        <div className="text-center mt-4 px-4">
          <h1 className="text-2xl font-bold break-words">{post.title}</h1>
        </div>
    
        {/* Content (Expands Dynamically) */}
        <div className="mt-4 px-4 text-justify break-words max-w-[600px]">
          {parse(post.content)}
        </div>
    
      </div>
    </div>
    

    ) : null;
}