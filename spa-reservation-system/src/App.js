import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Bookings from './components/pages/Bookings';
import './App.css';
import Header from './components/pages/Header';
import Weather from './components/pages/Weather';
import Admin from './components/pages/Admin';
import Footer from './components/pages/Footer';

function App() {
  return (
    <Router>
      <Header/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
