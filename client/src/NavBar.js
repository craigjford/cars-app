import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"; 
import { userRemoved } from "./features/user/userSlice";

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

function NavBar({ loggedIn, setLoggedIn, user }) {

  const dispatch = useDispatch();

  console.log('in NavBar - loggedIn = ', loggedIn);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch("/logout", 
    { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        dispatch(userRemoved(user.id))
        setLoggedIn(false)
        navigate('/');
      }
    });
  }

  return (
    <header>
      <div className="navbar">
        {loggedIn ? (
          <>
          <NavLink
            to="/"
            exact="true"
            style={navStyles}
          >
            Home
          </NavLink>  
          <NavLink
            to="/cars/new"
            style={navStyles}
          >
            Add Car
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