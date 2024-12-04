import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import StationDetails from './pages/StationDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/station/:id" element={<StationDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
