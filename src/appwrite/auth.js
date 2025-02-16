import config from "../config/config";
import { Client ,Account} from "appwrite";
import { ID } from 'appwrite';

export class AuthService{
    client= new Client();
    account;

    constructor()
    {
        this.client 
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account=new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            // Step 1: Create the user account
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("Account successfully created:", userAccount);
    
            // Step 2: Send email verification
            var session=await this.account.createEmailPasswordSession(email,password);
            var link=await this.account.createVerification(config.appwriteEmailVerificationId);
            console.log("Verification email sent. Please check your inbox.");
            await this.logout();
    
            return { message: "Verification email sent. Please verify before logging in." };
        } catch (error) {
            console.error("Account creation failed:", error.message);
            throw error;
        }
    }
    
    async login({email,password})
    {
        try{
            const userLogin= await this.account.createEmailPasswordSession(email,password);
            const user = await this.getCurrentUser();

        if (!user.emailVerification) {
            await this.logout();
            throw new Error("Email not verified. Please check your inbox.");
        }
            console.log("userLogin",userLogin);  
            console.log("JWT Token:", userLogin.jwt);
            return userLogin;
        }
        catch(error)
        {
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            const user = await this.account.get();
            if (!user.emailVerification) {
                console.log("User email is not verified.");
            }
            return user;
        }
        catch(error)
        {
            console.log("Appwrite service :: get current user error",error);
        }
        
        return null;
    }
    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error)
        {
            console.log("Appwrite Service :: logout :: error",error);
        }
    }

    async recoverPassword(email) {
        try {
            console.log('Mode:', import.meta.env.MODE);
            console.log('Redirect URL for Password Recovery:', config.redirecturl);
            await this.account.createRecovery(email, config.redirecturl);
            console.log("Recovery email sent successfully.");
        } catch (error) {
            console.error("Error sending recovery email:", error);
            throw error;
        }
    }

    async updateRecovery(userId, secret, newPassword, confirmPassword) {
        try {
            const response = await this.account.updateRecovery(userId, secret, newPassword, confirmPassword);
            console.log('Password updated successfully:', response);
        } catch (error) {
            console.error('Failed to update password:', error);
            throw error;
        }
    }

}
console.log(AuthService.prototype); 
const authService=new AuthService();

export default authService