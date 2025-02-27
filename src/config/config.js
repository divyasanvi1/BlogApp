const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URl),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
    appwriteApiKey:String(import.meta.env.VITE_APPWRITE_API_Key),
    redirecturl:String(import.meta.env.VITE_APPWRITE_REDIRECT_URL_DEPLOYED),
    appwriteEmailVerificationId:String(import.meta.env.VITE_APPWRITE_REDIRECT_VERIFICATION_URL),
}

export default config
