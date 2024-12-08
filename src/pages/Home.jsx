import React from 'react';
import './Home.css';
import image1 from '../assets/images/adv_filtering.jpg';
import image2 from '../assets/images/fuel_price.jpg';
import image3 from '../assets/images/gas_station.jpg';

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to Pitstop-Go</h1>
      <div className="image-cards">
        <div className="image-card">
          <img src={image1} alt="Fuel Station 1" className="image-card-img"/>
          <p className="image-card-text">Goal 1: Easy fuel discovery</p>
        </div>
        <div className="image-card">
          <img src={image2} alt="Fuel Station 2" className="image-card-img"/>
          <p className="image-card-text">Goal 2: Fuel type and Availability</p>
        </div>
        <div className="image-card">
          <img src={image3} alt="Fuel Station 3" className="image-card-img"/>
          <p className="image-card-text">Goal 3: User-friendly experience</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
