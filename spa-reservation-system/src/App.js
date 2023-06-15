import React, { useState } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Header/>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
