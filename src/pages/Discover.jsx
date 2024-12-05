import React, { useState, useEffect } from "react";
import "./Discover.css";

const Discover = () => {
  const [formData, setFormData] = useState({
    fuelType: "",
    zipCode: "",
    vehicleType: "",
  });

  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);

    // Fetch from the Flask API (adjust the endpoint URL as needed)
    fetch("http://127.0.0.1:5000/stations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }
        return response.json();
      })
      .then((data) => {
        setStations(data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setError("Could not fetch stations. Try again later.");
      });
  };

  return (
    <div className="discover">
      <h1>Discover Fueling Stations</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fuel Type:
          <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="EV">EV</option>
            <option value="LPG">LPG</option>
            <option value="CNG">CNG</option>
            <option value="ATV">ATV</option>
          </select>
        </label>
        <label>
          Zip Code:
          <input
            type="number"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </label>
        <label>
          Vehicle Type/Class:
          <input
            type="text"
            name="vehicleType"
            placeholder="e.g., Sedan, Heavy"
            value={formData.vehicleType}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {error && <p className="error">{error}</p>}
        {stations.length > 0 && (
          <ul>
            {stations.map((station, index) => (
              <li key={index}>
                <strong>{station.label}</strong>
                <br />
                <a href={station.uri} target="_blank" rel="noopener noreferrer">
                  {station.uri}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Discover;
