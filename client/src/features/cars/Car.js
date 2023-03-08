import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function Car({ car }) {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  if (!loggedIn) {navigate('/')};

  const handleDelete = (car) => {
      debugger;
  }

  const handleUpdate = (car) => {
      debugger;    
  }

  return (
    <div>
        <h3>Year: {car.year}</h3>
        <h3>Make: {car.make}</h3>
        <h3>Model: {car.model}</h3>
        <h3><u>Dealer</u></h3>
        <h3>Dealer Name: {car.dealer.name}</h3>
        <h3>Contact: {car.dealer.contact}</h3>
        <h3>Phone: {car.dealer.phone}</h3>
        <h3>Email: {car.dealer.email}</h3>

        <br />
        <button type="button" className="submit-btn" onClick={() => handleDelete(car)}>Delete Car</button>
        <button type="button" className="submit-btn" onClick={() => handleUpdate(car)}>Update Car</button>
        <br />
        <Link to={`/cars/${car.id}/repairs/new`}>
              <button className="submit-btn">Add Repair</button>
        </Link>
        <br />
        <hr />
     </div>
   )
 }

export default Car;