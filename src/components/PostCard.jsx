import React from 'react'
import appwriteService from "../appwrite/configuration"
import { Link } from 'react-router-dom'

function PostCard({post:{$id,title,featuredImage}}) {
   console.log("id",$id);
  return (

    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
  <div className="w-full flex justify-center mb-4">
    <img 
      src={appwriteService.getFilePreview(featuredImage)} 
      alt={title}
      className="rounded-xl "
    />
  </div>

  <h2 className="text-xl sm:text-lg md:text-xl font-bold text-center truncate">{title}</h2>
</div>


    </Link>
    
  )
}

export default PostCard