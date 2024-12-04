import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Pitstop-Go</h1>
      <p>Your ultimate solution for discovering optimal fueling stations based on your vehicle's needs!</p>
      <div className="info-cards">
        <div className="card">
          <img src="https://via.placeholder.com/300" alt="Goal 1" />
          <h3>Goal 1</h3>
          <p>Find the best fuel options tailored to your vehicle type.</p>
        </div>
        <div className="card">
          <img src="https://via.placeholder.com/300" alt="Goal 2" />
          <h3>Goal 2</h3>
          <p>Locate the nearest fueling stations with advanced filtering.</p>
        </div>
        <div className="card">
          <img src="https://via.placeholder.com/300" alt="Goal 3" />
          <h3>Goal 3</h3>
          <p>Get real-time updates on fuel prices and availability.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
