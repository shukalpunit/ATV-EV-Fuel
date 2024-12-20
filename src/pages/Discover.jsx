import React, { useState } from 'react';
import axios from 'axios';
import './discover.css';

function App() {
  const [fuelType, setFuelType] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/stations', {
        fuelType,
        zipCode,
      });

      if (response.data.results?.bindings) {
        setStations(response.data.results.bindings);
      } else {
        setStations([]);
      }
    } catch (error) {
      console.error('Error fetching station data:', error);
      setError('Could not fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Alternative Fuel Stations Finder</h1>

      {/* Form Section */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="discover-form">
          <label>
            Fuel Type:
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Biodiesel">Biodiesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
              <option value="E85">E85</option>
              <option value="LPG">LPG</option>
              <option value="LNG">LNG</option>
              <option value="RenewableDiesel">RenewableDiesel</option>
              <option value="Hydrogen">Hydrogen</option>
            </select>
          </label>

          <label>
            Zip Code:
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </label>

          <button type="submit">Search</button>
        </form>
      </div>

      {/* Loading/Status Message */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Display Results */}
      <div className="results">
        <h2>Results</h2>
        {stations.length > 0 ? (
          <div className="cards-container">
            {stations.map((station, index) => (
              <div className="station-card" key={index}>
                <h3>{station.hasName?.value || 'Unknown Station'}</h3>
                <p>
                  <strong>Location:</strong> {station.locatedInCity?.value}, {station.locatedInState?.value}, {station.locatedInCountry?.value}
                </p>
                <p>
                  <strong>Address:</strong> {station.hasStreetAddress?.value || 'N/A'}
                </p>
                <p>
                  <strong>Phone:</strong> {station.hasPhone?.value || 'N/A'}
                </p>
                <div className="access-code-container">
                  <p>
                    <strong>Access Code:</strong>{' '}
                    <span className="tooltip">
                      {station.hasAccessCode?.value || 'N/A'}
                    </span>
                    {station.hasAccessCode?.value?.length > 30
                      ? `${station.hasAccessCode?.value.slice(0, 30)}...`
                      : station.hasAccessCode?.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No stations found or select a different query.</p>
        )}
      </div>
    </div>
  );
}

export default App;
