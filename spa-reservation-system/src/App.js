import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import { AuthContext } from './AuthContext';
import Bookings from './components/pages/Bookings';
import './App.css';
import Header from './components/pages/Header';
import Weather from './components/pages/Weather';
import Admin from './components/pages/Admin';
import Footer from './components/pages/Footer';
import Account from './components/pages/Account';
import Login from './components/pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userId, setUserId] = useState(
    localStorage.getItem('userId') || null
  ); // Create new state for userId

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userId', userId); // Store userId in localStorage
  }, [isAuthenticated, userId]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}> 
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/:id" element={<Home />} />  // Add :id to route
            <Route path="/account/:id" element={<Account />} />  // Add :id to route
            <Route path="/bookings/:id" element={<Bookings />} />  // Add :id to route
            <Route path="/weather/:id" element={<Weather />} />  // Add :id to route
            <Route path="/admin/:id" element={<Admin />} />  // Add :id to route
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}


export default App;
