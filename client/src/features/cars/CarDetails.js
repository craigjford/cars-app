import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function CarDetails() {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  if (!loggedIn) {navigate('/')};

  const params = useParams();
  console.log("params car = ", params)

  // const handleDelete = (car) => {
  //     debugger;
  // }

  // const handleUpdate = (car) => {
  //     debugger;    
  // }

  return (
    <div>
        <h1>Car Details</h1>
        {/* <br />
        <h3>Year: {car.year}</h3>
        <h3>Make: {car.make}</h3>
        <h3>Model: {car.model}</h3>
        <br />
        <hr /> */}
        {/* <button type="button" className="submit-btn" onClick={() => handleDelete(car)}>Delete Car</button>
        <button type="button" className="submit-btn" onClick={() => handleUpdate(car)}>Update Car</button>
        <br />
        <Link to={`/cars/${car.id}/repairs/new`}>
              <button className="submit-btn">Add Repair</button>
        </Link>
        <br />
        <hr /> */}
     </div>
   )
 }

export default CarDetails;