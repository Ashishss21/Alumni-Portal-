// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { authState, logout } = useAuth();
  const history = useNavigate();

  const handleLogout = () => {
    logout();
    history('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl">Alumni App</Link>
        <div>
          <Link to="/profile" className="text-white mr-4">Profile</Link>
          {authState.isAuthenticated ? (
            <>
              <Link to="/community" className="text-white mr-4">Community</Link>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white mr-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
