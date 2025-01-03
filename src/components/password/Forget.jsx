import React,{useState} from 'react'
import authService from '../../appwrite/auth'
import "./cover.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forget=()=>{
      const [email,setEmail]=useState('');

      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await authService.recoverPassword(email);
            toast.success('Recovery email sent! Check your inbox.');
            setEmail('');
        }
        catch (error) {
          toast.error('Failed to send recovery email. Please try again.');
        }
      };
    return( 
      <div className="forgot">
        <div className="block-forget">
        <form onSubmit={handleSubmit}>
          <input 
           type="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           placeholder="Enter your Email"
           required
           style={{
            width: '100%',   
            maxWidth: '400px', 
            height: 'auto',  
            fontSize: '1rem', 
            padding: '10px',  
            marginRight: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            boxSizing: 'border-box'  
          }}
          />
          <button className="sub" type="submit">Send Recovery Email</button>
        </form>
        </div>
        <ToastContainer />
        </div>
    );
};

export default Forget;