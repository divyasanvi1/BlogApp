import React, { useEffect, useState, useRef, useCallback } from "react";
import appwriteService from "../appwrite/configuration";
import { Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";
import ParticlesBackground from "../components/Particlesbackground";

function Home() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);  // NEW: Loading state
    const observer = useRef(null);

    // Fetch posts with pagination
    const fetchPosts = async (pageNumber) => {
        setLoading(true); // Start loading
        try {
            const result = await appwriteService.getPosts(pageNumber, 5);
            if (result && result.documents.length > 0) {
                setPosts((prevPosts) => {
                    const newPosts = result.documents.filter(
                        (newPost) => !prevPosts.some((existingPost) => existingPost.$id === newPost.$id)
                    );
                    return [...prevPosts, ...newPosts].sort(
                        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
                    );
                });

                setFilteredPosts((prevPosts) => {
                    const newPosts = result.documents.filter(
                        (newPost) => !prevPosts.some((existingPost) => existingPost.$id === newPost.$id)
                    );
                    return [...prevPosts, ...newPosts].sort(
                        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
                    );
                });
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false); // Stop loading
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    // Intersection Observer to trigger fetch when last post is visible
    const lastPostRef = useCallback(
        (node) => {
            if (!hasMore || loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [hasMore, loading]
    );

    // Function to handle search
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    // Show loading spinner while fetching posts
    if (loading && posts.length === 0) {
        return (
            <div className="w-full py-8 flex justify-center items-center min-h-screen">
                <ParticlesBackground />
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500"></div>
                    <p className="mt-2 text-gray-500 text-sm">Loading posts...</p>
                </div>
            </div>
        );
    }

   
    if (!loading && posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <ParticlesBackground />
                <Container>
                <div className="flex flex-col items-center text-center min-h-[50vh] w-full px-6 relative z-10">
  <h1 className="text-4xl font-extrabold text-gray-200 hover:text-blue-400 transition-colors duration-300 ease-in-out drop-shadow-lg">
    Unlock Exclusive Content!
  </h1>
  
  <p className="mt-6 text-lg text-gray-300 max-w-lg leading-relaxed tracking-wide">
    Discover a world of exclusive posts, in-depth articles, and expert insights available only to our members. 🚀  
    <Link to="/signup" className="text-blue-400 font-semibold hover:underline hover:text-blue-300 transition-all">
      Join our community today
    </Link> and start reading content tailored just for you.
  </p>

  <div className="mt-8">
    <Link to="/about">
      <button className="px-8 py-3 bg-gray-700 text-white rounded-full font-semibold shadow-md hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400">
        Explore 🚀
      </button>
    </Link>
  </div>
</div>


                </Container>
            </div>
        );
    }

    return (
      <div className="w-full py-8">
          <ParticlesBackground />
          <Container>
              {/* Search Bar - Responsive Width */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search posts..."
    className="border rounded-lg p-3 w-full sm:w-1/2 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-600 focus:outline-none"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="px-6 py-3 bg-gray-700 text-white text-lg rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:outline-none"
  >
    Search
  </button>
</div>

              {/* Responsive Grid for Post Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPosts.map((post, index) => (
                      <div 
                          key={post.$id} 
                          className="p-2" 
                          ref={index === filteredPosts.length - 1 ? lastPostRef : null}
                      >
                          <PostCard post={post} />
                      </div>
                  ))}
              </div>
          </Container>
      </div>
  );
  
}

export default Home;
