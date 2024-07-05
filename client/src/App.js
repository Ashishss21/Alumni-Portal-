// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <div className="app">
          <Routes>
            <Route exact path="/" Component={LandingPage} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
          </Routes> 
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
