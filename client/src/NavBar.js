import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"; 
import { userReset } from "./features/user/userSlice";
import { dealerReset } from "./features/dealers/dealersSlice";
import { carReset } from "./features/cars/carsSlice";
import { mydealerReset } from "./features/mydealers/mydealersSlice";
import { repairReset } from "./features/repairs/repairsSlice";

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

function NavBar({ loggedIn }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    fetch("/logout", 
    { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        dispatch(userReset());
        dispatch(carReset());
        dispatch(dealerReset());
        dispatch(mydealerReset());
        dispatch(repairReset())
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
            to="/mycars"
            style={navStyles}
          >
            My Cars
          </NavLink> 
          <NavLink
            to="/repairs"
            style={navStyles}
          >
            My Repairs
          </NavLink>
          <NavLink
            to="/mydealers"
            style={navStyles}
          >
            My Dealers
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
            exact="true"
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