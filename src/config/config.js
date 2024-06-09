const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URl),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
}
// this gurantees that everything will be in string unles if it is not in sting then app will crash
export default config