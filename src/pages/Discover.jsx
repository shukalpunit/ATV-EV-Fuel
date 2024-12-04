import React, { useState } from "react";
import "./Discover.css";

const Discover = () => {
  const [formData, setFormData] = useState({
    fuelType: "",
    zipCode: "",
    vehicleType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
    // Process form submission logic here
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
    </div>
  );
};

export default Discover;
