import React from 'react';
import Repair from "../repairs/Repair";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

function CarDetails() {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const cars = useSelector((state) => state.cars.entities);
  
  if (!loggedIn) {navigate('/')};

  const params = useParams();
  console.log("params car = ", params);

  const filteredCar = cars.filter((car) => car.id === parseInt(params.car_id))
  const car = filteredCar[0];

  const repairsList = car.repairs.map((repair) => <Repair key={repair.id} repair={repair} />); 

  // const handleDelete = (car) => {
  //     debugger;
  // }

  // const handleUpdate = (car) => {
  //     debugger;    
  // }

  return (
    <div>
        <h1>Car Details</h1>
        <h3>Year: {car.year}</h3>
        <h3>Make: {car.make}</h3>
        <h3>Model: {car.model}</h3>
        <h2><u>Car Dealer</u></h2>
        <h3>Name: {car.dealer.name}</h3>
        <h3>Contact: {car.dealer.contact}</h3>
        <h3>Phone: {car.dealer.phone}</h3>
        <h3>Email: {car.dealer.email}</h3>
        <h2><u>Car Repairs</u></h2>
            {repairsList.length > 0 ? repairsList : <h3>No Repairs Exist</h3>}

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