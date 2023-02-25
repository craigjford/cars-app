import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navStyles = ({ isActive }) => {
  return {  
    display: "inline-block",
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: isActive ? "darkblue" : "blue",
    textDecoration: "none",
    color: "white",
  };
};  

function NavBar({ userFound }) {

  console.log('user = ', userFound);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch("/logout", 
    { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        // logout();
        navigate('/');
      }
    });
  }


  return (
    <header>
      <div className="navbar">
          <NavLink
              to="/"
              exact="true"
              style={navStyles}
            >
              Home
          </NavLink>  
          <NavLink
            to="/login"
            style={navStyles}
          >
            Log In
          </NavLink>  
          <NavLink
            to="/signup"
            style={navStyles}
          >
            Sign Up
          </NavLink>  
        <hr />
        <button className="submit-btn" onClick={handleLogoutClick}>Logout</button>
      </div>
    </header>
  );
}

export default NavBar