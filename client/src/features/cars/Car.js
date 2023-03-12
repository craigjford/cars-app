import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Car({ car }) {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  if (!loggedIn) {navigate('/')};

  return (
    <div>
        <h3>Year: {car.year}</h3>
        <h3>Make: {car.make}</h3>
        <h3>Model: {car.model}</h3>
        <br />
        <Link to={`/cars/${car.id}/edits`}>
              <button className="submit-btn">Car Details</button>
        </Link>
        <br />
        <br />
        <hr />
     </div>
   )
 }

export default Car;