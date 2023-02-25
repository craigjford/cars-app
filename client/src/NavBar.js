import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux"; 

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

function NavBar({ chgUser, user }) {

  // const users = useSelector((state) => state.users.entities);
  // const user = users[0];

  console.log('in NavBar - user = ', user);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch("/logout", 
    { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        chgUser("");
        navigate('/');
      }
    });
  }


  return (
    <header>
      <div className="navbar">
        {user ? (
          <>
          <NavLink
            to="/home"
            exact="true"
            style={navStyles}
          >
            Home
          </NavLink>  
          <NavLink
            to="/dealers"
            style={navStyles}
          >
            All Dealers
          </NavLink>  
          <button className="any-btn" onClick={handleLogoutClick}>Logout</button>
          <hr />
          <br />
          <br />
          <br />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar