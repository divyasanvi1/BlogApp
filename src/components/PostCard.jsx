import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/configuration";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

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

  // Function to download image with toast notifications
  const handleDownload = async (e) => {
    e.preventDefault(); // Prevent navigation on button click

    try {
      toast.info("📥 Download started...", { autoClose: 2000 });

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

      toast.success("✅ Download complete!", { autoClose: 3000 });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("❌ Download failed. Try again!");
    }
  };

  return (
    <>
      
      
      <Link to={`/post/${$id}`}>
        <div
          className="relative w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative w-full flex justify-center mb-4 overflow-hidden rounded-xl">
            {imageSrc ? (
              <img src={imageSrc} alt={title} className="rounded-xl object-cover w-full" />
            ) : (
              <p>Loading...</p>
            )}

            {/* Transparent Overlay + Centered Download Button (Visible on Hover) */}
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

          <h2 className="text-xl sm:text-lg md:text-xl font-bold text-center truncate">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
