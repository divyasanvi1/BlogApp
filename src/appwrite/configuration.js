import config from "../config/config";
import { Client ,ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    
    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.databases= new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
             return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
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

    async getPost(slug){
        try{
             return await this.databases.getDocument(
                config.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             )
        }
        catch(error){
             console.log("Appwrite service getpost:: error",error)
             return false;
        }
    }
}

const service=new Service()
export default service