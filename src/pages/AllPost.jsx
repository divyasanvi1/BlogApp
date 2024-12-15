import React,{useState,useEffect} from 'react'
import {Container,PostCard} from "../components/index"
import appwriteService from "../appwrite/configuration"
import authService from '../appwrite/auth'


function AllPost() {
    const [posts,setPosts]=useState([])
    
    useEffect(() => {
        // Function to fetch the userId
        const getUserId = async () => {
            const user = await authService.getCurrentUser(); // Get the current user data
            if (user) {
                return user.$id;  // Extract and return the userId
            }
            return null;  // Return null if there's no user or an error occurs
        };

        // Main logic to fetch posts and their featured images
        const fetchPosts = async () => {
            const userId = await getUserId();  // Wait for the userId to be fetched
        
            if (userId) {
                try {
                    const response = await appwriteService.getFeaturedImageByUserId(userId); // Fetch posts
        
                    // Ensure response is an array before processing
                    if (Array.isArray(response)) {
                        const postsWithImages = await Promise.all(
                            response.map(async (post) => {
                                let featuredImageUrl = null;
        
                                if (post.featuredImage) {
                                    try {
                                        const file =appwriteService.getFilePreview(post.featuredImage);
                                        featuredImageUrl = file?.href || null;
                                    } catch (error) {
                                        console.error("Error fetching image:", error);
                                    }
                                }
        
                                return {
                                    ...post,
                                    featuredImageUrl,
                                };
                            })
                        );
        
                        setPosts(postsWithImages); // Update state with posts and images
                    } else {
                        console.warn("Response is not an array:", response);
                        setPosts([]); // Fallback to empty state
                    }
                } catch (error) {
                    console.error("Error fetching posts:", error);
                    setPosts([]); // Fallback to empty state on error
                }
            }
        };
        fetchPosts();
    }, []);  // Empty dependency array to ensure this runs only once when the component mounts

    
   
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                         <PostCard post={post}/>
                    </div>
                    ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost