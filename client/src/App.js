// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Profile from "./pages/UserProfile";
import CommunityPage from "./pages/CommunityPage"; // Import the CommunityPage component

const App = () => {
  const { authState } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={authState.isAuthenticated ? <CommunityPage /> : <Navigate to="/login" />} />
          </Routes> 
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
