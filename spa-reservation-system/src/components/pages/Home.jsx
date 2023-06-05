import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
    

      <header className="hero bg-info text-white text-center">
        <div className="container">
          <h1>Welcome to Vetta Hot Spa</h1>
          <p className="lead">Relax and rejuvenate in our luxurious spa. Book your session today!</p>
          <a href="#" className="btn btn-primary btn-lg">Book Now</a>
        </div>
      </header>

      <footer className="footer bg-light text-center">
        <div className="container">
          <span className="text-muted">© 2023 Vetta Hot Spa. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
