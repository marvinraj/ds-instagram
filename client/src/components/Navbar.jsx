import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md border-b">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="text-2xl font-bold italic text-gray-800">
                    Instagram
                </a>

                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <li>
                        <a href="#" className="hover:text-blue-500 transition">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-500 transition">
                            Explore
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-500 transition">
                            Reels
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-500 transition">
                            Messages
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-500 transition">
                            Profile
                        </a>
                    </li>
                </ul>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Logout
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
