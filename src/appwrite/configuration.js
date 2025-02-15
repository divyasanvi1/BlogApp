import config from "../config/config.js";
import { Client ,ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    
    constructor()
    {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.databases= new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
             return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                config.appwriteActivityCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
             )
        }
        catch(error)
        {
            console.log("Appwrite Service :: create Post ::error",error);
        }
    }
    
    async updatePost(slug,{title, content, featuredImage, status})
    {
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        }
        catch(error)
        {
            console.log("Appwrite Service :: update Post ::error",error); 
        }
    }
    async deletePost(slug){
      try{
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            config.appwriteActivityCollectionId,
            slug,
        )
        return true;
      }

      catch(error)
      {
        console.log("Appwritr service ::delete post:: error",error);
        return false;
      }
    }
    
     async getFeaturedImageByUserId (userId){
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,                // Your Appwrite Database ID
                config.appwriteCollectionId, // Collection ID for featured images
                [Query.equal("userId", userId)]           // Query for userId
            );
    
            if (response.documents.length > 0) {
                return response.documents; // Return the first matching document
            }
    
            return false; // Return null if no match found
        } catch (error) {
            console.error("Appwrite service :: getFeaturedImageByUserId :: error", error);
            return false; // Return null if an error occurs
        }
    };

    
    async getPost(slug){
        console.log("Slug:", slug);  
        try{
             return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
             )
        }
        catch(error){
             console.log("Appwrite service getpost:: error",error)
             return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
             return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
             )
        }
        catch(error){
             console.log("Appwrite service getpost:: error",error)
             return false;
        }
    }

    // file upload and delete
    async uploadFile(file)
    {
        try{
            console.log("hi file")
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite upload file:: error",error)
            return false;
       }
    }

    async deleteFile(fileId)
    {
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(error){
            console.log("Appwrite delete file:: error",error)
            return false;
       }
    }

    getFilePreview(fileId)
    {
        console.log("hiii file preview1",config.appwriteBucketId);
        console.log("hiii file preview",fileId);
            const response= this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            console.log("response file preview",response);
            return response;   
    }
}

const service=new Service()
export default service