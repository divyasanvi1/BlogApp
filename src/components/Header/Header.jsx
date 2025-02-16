import React, { useState, useEffect, useRef } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const userEmail = userData?.userData?.email || userData?.email;

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <Container>
                <nav className="flex justify-end items-center gap-x-6 py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Navigation items */}
                    <ul className="hidden md:flex space-x-6 ml-auto">
                        {/* Home Button (Icon only) */}
                        <li>
                        <button
        onClick={() => navigate("/")}
        className="w-12 h-12 flex items-center justify-center bg-gray-700 text-gray-300 rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 hover:text-white focus:outline-none"
        >
        <Home className="w-8 h-8" />
        </button>
                        </li>

                        {/* SignIn Button */}
                        {!authStatus && (
                            <li>
                               <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
            }}
            className="px-5 py-2 bg-gray-700 text-gray-300 text-lg rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 hover:text-white focus:outline-none"
        >
            Sign In
        </button>
                            </li>
                        )}
                    </ul>

                    {/* User Profile Dropdown (Only when logged in) */}
                    {authStatus && (
    <div className="relative group" ref={dropdownRef}>
        <button
            className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold text-lg"
        >
            {userEmail.charAt(0).toUpperCase()}
        </button>

        {/* Dropdown appears on hover */}
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
                onClick={() => navigate("/all-posts")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700"
            >
                My Posts
            </button>
            <button
                onClick={() => navigate("/add-post")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700"
            >
                Add Post
            </button>
            <div className="border-t border-gray-600"></div>
            <div className="px-4 py-2">
                <LogoutBtn />
            </div>
        </div>
    </div>
)}


                    {/* Mobile menu toggle */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-700 focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden flex flex-col space-y-4 mt-4">
                            <button
    onClick={() => {
        navigate("/");
        setIsMenuOpen(false);
    }}
    className="w-12 h-12 flex items-center justify-center bg-gray-700 text-gray-300 rounded-full shadow-md"
>
    <Home className="w-7 h-7" />
</button>

{!authStatus && (
   <button
   onClick={() => {
       navigate("/login");
       setIsMenuOpen(false);
   }}
   className="px-5 py-2 bg-gray-700 text-gray-300 text-lg rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 hover:text-white focus:outline-none"
>
   Sign In
</button>
)}
                            {authStatus && (
                                <div className="mt-2">
                                    <LogoutBtn />
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </Container>
        </header>
    );
}

export default Header;
