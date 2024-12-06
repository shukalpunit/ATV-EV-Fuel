import React, { useState } from "react";
import "./Discover.css";

const Discover = () => {
  const [formData, setFormData] = useState({
    fuelType: "",
    zipCode: "",
    vehicleType: "",
  });

  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");
  const [formWarning, setFormWarning] = useState(""); // Warning for empty form fields

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure only numeric values up to 9 digits for zipCode
    if (name === "zipCode" && value.length > 9) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.fuelType || !formData.zipCode || !formData.vehicleType) {
      setFormWarning("Please fill out all fields before submitting.");
      return;
    }

    setFormWarning(""); // Clear warning if all fields are valid
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
        if (data.length === 0) {
          setError("No stations found. Try refining your search.");
        } else {
          setStations(data);
          setError("");
        }
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setStations([]);
        setError("Could not fetch stations. Try again later.");
      });
  };

  return (
    <div className="discover">
      <h1>Discover Fueling Stations</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="discover-form">
          <label>
            Fuel Type:
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Biodiesel">Biodiesel</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
              <option value="Hydrogen">Hydrogen</option>
              <option value="LNG">LNG</option>
              <option value="LPG">LPG</option>
              <option value="Renewable Diesel">Renewable Diesel</option>
            </select>
          </label>
          <label>
            Zip Code:
            <input
              type="number"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter Zip Code"
            />
          </label>
          <label>
            Vehicle Type/Class:
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Heavy Duty">Heavy Duty</option>
              <option value="Medium Duty">Medium Duty</option>
            </select>
          </label>
          <button type="submit">Search</button>
          {formWarning && <p className="form-warning">{formWarning}</p>}
        </form>
      </div>

      <div className="results">
        {error && <p className="error">{error}</p>}
        {stations.length > 0 ? (
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
        ) : (
          !error && <p>No stations to display. Submit the form to search.</p>
        )}
      </div>
    </div>
  );
};

export default Discover;
