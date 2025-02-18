import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/configuration";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";


function PostCard({ post: { $id, title, featuredImage } }) {
  const [imageSrc, setImageSrc] = useState("");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(appwriteService.getFilePreview(featuredImage));
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [featuredImage]);

  const handleDownload = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch(appwriteService.getFilePreview(featuredImage));
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = title || "downloaded-image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 1000);
      console.log("Toast Triggering:", toast);

      
      console.log("toastdownloadcomplete");
    } catch (error) {
      console.error("Download failed:", error);
      
    }
  };

  return (
    <Link to={`/post/${$id}`} className="w-full">
      <div
        className="relative bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-3 w-full max-w-xs mx-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-xl overflow-hidden flex justify-center items-center">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <p>Loading...</p>
          )}

          {hovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
              <button
                onClick={handleDownload}
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition duration-200"
              >
                <FaDownload size={24} className="text-black" />
              </button>
            </div>
          )}
        </div>

        <h2 className="text-lg md:text-xl font-bold text-center mt-2 truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
