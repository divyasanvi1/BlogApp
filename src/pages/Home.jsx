import React,{useEffect,useState} from 'react'
import appwriteService from "../appwrite/configuration"
import {Container, PostCard} from "../components/index"
import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/Particlesbackground';

function Home() {
    const [posts,setPosts]=useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
              if(posts)
              {
                setPosts(posts.documents)
                setFilteredPosts(posts.documents);
              }
        })
    },[])
    
    // Function to handle search when button is clicked
    const handleSearch = () => {
      if (searchTerm.trim() === "") {
          setFilteredPosts(posts); // Show all posts if search is empty
      } else {
          const filtered = posts.filter(post =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredPosts(filtered);
      }
  };

    if (posts.length === 0) {
        return (
          <div className="w-full py-8 mt-4 text-center">
            <ParticlesBackground />
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
          <ParticlesBackground />
            <Container>
            <div className="flex justify-center mb-6">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="border rounded-lg p-2 w-1/2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                <div className='flex flex-wrap'>
                    {filteredPosts.map((post) => (
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