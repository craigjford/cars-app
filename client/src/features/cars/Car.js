import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        <h3>Dealer: {car.dealer.name}</h3>
        <h3>Contact: {car.dealer.contact}</h3>
        <h3>Phone: {car.dealer.phone}</h3>
        <h3>Email: {car.dealer.email}</h3>
        <h3>Year: {car.year}</h3>
        <h3>Make: {car.make}</h3>
        <h3>Model: {car.model}</h3>
        <br />
        <button type="button" onClick={() => handleDelete(car)}>Delete Car</button>
        <button type="button" onClick={() => handleUpdate(car)}>Update Car</button>
        <br />
        <br />
        <hr />
     </div>
   )
 }

export default Car;