import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
  const navStyle = {
    color: 'white'
  };
  return (
    <nav>
      <ul className="nav-Links">
        <Link style={navStyle} to="/"><li>Home</li></Link>
        <Link style={navStyle} to="/about"><li>About</li></Link>
        <Link style={navStyle} to="/signin"><li>Sign In</li></Link>
        <Link style={navStyle} to="/signup"><li>Sign Up</li></Link>
      </ul>
    </nav>

  );
}


export default Nav;