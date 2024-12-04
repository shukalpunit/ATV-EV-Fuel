import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">Pitstop-Go</Link>
      <nav>
        <Link to="/discover">Discover</Link>
        {/* Add more links here as needed */}
      </nav>
    </header>
  );
};

export default Header;
