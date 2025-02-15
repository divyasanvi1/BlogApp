import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const logoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
            navigate('/login');
        })
    }
  return (
    <button
    className="inline-block px-6 py-2 duration-200 bg-gray-700 text-white hover:bg-gray-800 rounded-full"
    onClick={logoutHandler}
  >
    <LogoutIcon className="h-5 w-5 mr-2" />
  </button>
  
  )
}

export default LogoutBtn