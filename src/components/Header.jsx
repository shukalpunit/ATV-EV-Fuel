import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header-title">
        Pitstop-Go
      </Link>
      <div className="header-links">
        <Link to="/discover" className="header-button">
          Discover
        </Link>
      </div>
    </div>
  );
};

export default Header;
