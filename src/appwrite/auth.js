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
    async createAccount({email,password,name})
    {
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            console.log("hii from auth");
            if(userAccount)
                {
                    console.log("hii");
                     return this.login({email,password});
                }
                else
                {
                    return userAccount;
                }
        }
        catch(error)
        {
            console.error("Account creation failed:", error.message); 
            throw error;
        }
    }
    async login({email,password})
    {
        try{
            const userLogin= await this.account.createEmailPasswordSession(email,password);
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
            return await this.account.get();
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