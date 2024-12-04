import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/station/1">Station 1</Link>
        <Link to="/station/2">Station 2</Link>
      </nav>
    </header>
  );
};

export default Header;
