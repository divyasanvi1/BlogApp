import React, { useState } from "react";
import {Container,Logo,LogoutBtn} from "../index"
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header(){
    const authStatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate()
     
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "My Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]
    return(
      <header>
  <Container>
    <nav className="flex justify-between items-center py-4">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link to="/">
          <Logo width="70px" />
        </Link>
      </div>

      {/* Navigation items on the right for larger screens */}
      <ul className="hidden md:flex space-x-6 ml-auto">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  {item.name}
                </button>
              </li>
            )
        )}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>

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
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.slug);
                    setIsMenuOpen(false); // Close the mobile menu after navigation
                  }}
                  className="block px-8 py-3 bg-blue-500 text-white font-semibold text-sm rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  {item.name}
                </button>
              )
          )}
          {authStatus && (
            <div>
              <LogoutBtn />
            </div>
          )}
        </div>
      )}
    </nav>
  </Container>
</header>

    )
}

export default Header