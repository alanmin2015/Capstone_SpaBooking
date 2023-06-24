import React from "react";
import "./Home.css";


const Home = () => {

  
  return (
    <div>
      <div className="home-container1">
        <div className="home1">
          <h1 className="home-title">Welcome to Vetta Nordic Spa</h1>
          <p className="home1-content">
            &nbsp;&nbsp;&nbsp;&nbsp; Experience pure serenity at Vetta Spa, an
            enchanting Nordic oasis in Ontario. Unwind in soothing hot tubs,
            invigorating saunas, and immerse yourself in breathtaking nature
            views, as tranquility embraces your senses in this blissful retreat.
            Let Vetta Spa be your sanctuary for complete rejuvenation and escape
            into a realm of ultimate relaxation.
          </p>
          <button className="bookingButton">
            <a href="/bookings" className="buttonLink">
              Book Now
            </a>
          </button>
        </div>
      </div>
      <div className="home-container2">
        <div className="home2">
          <h1 className="home-title">
            Experience Our Traditonal Nordic Massage
          </h1>
          <p className="home2-content">
            &nbsp;&nbsp;&nbsp;&nbsp; Discover the epitome of relaxation at Vetta
            Nordic Spa's exquisite massage offerings. Let skilled hands melt
            away tension and transport you to a state of pure bliss, as you
            indulge in personalized treatments tailored to your unique needs and
            desires.
          </p>
          <button className="bookingButton">
            <a href="/bookings" className="buttonLink">
              Book Now
            </a>
          </button>
        </div>
      </div>
      <div className="home-container3">
        <div className="home3">
          <h1 className="home-title">Enjoy Our Fancy Bistro</h1>
          <p className="home3-content">
            &nbsp;&nbsp;&nbsp;&nbsp; Savor a delightful selection of
            refreshments at Vetta Nordic Spa, where you can enjoy a variety of
            aromatic teas, invigorating coffees, and rejuvenating juices.
            Complement your spa experience with a range of nourishing and
            delectable food options, thoughtfully prepared to nourish your body
            and enhance your wellness journey.
          </p>
          <button className="bookingButton">
            <a href="/bookings" className="buttonLink">
              Book Now
            </a>
          </button>
        </div>
      </div>
      <div className="home-container4">
        <div className="home4">
          <h1 className="home-title">Location:</h1>
          <p className="home4-content">
          3210 Line 3 N, Oro-Medonte, ON L0L 2L0
          </p>
          <h2>Phone:</h2>
          <p className="home4-content" >+17058351500</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
