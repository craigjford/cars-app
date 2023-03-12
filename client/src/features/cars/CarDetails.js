import React, { useState } from 'react';
import Repair from "../repairs/Repair";
import RepairInput from "../repairs/RepairInput";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { carRepairRemoved } from "./carsSlice";

function CarDetails() {
  const [addingRepair, setAddingRepair] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  const cars = useSelector((state) => state.cars.entities);
  
  if (!loggedIn) {navigate('/')};

  const params = useParams();

  const filteredCar = cars.filter((car) => car.id === parseInt(params.car_id))
  const car = filteredCar[0];

  const handleDelete = (repair) => {

    fetch(`/repairs/${repair.id}`, {
        method: 'DELETE'
    })
    .then(dispatch(carRepairRemoved(repair)));
    
  }

  const repairsList = car.repairs.map((repair) => <Repair key={repair.id} repair={repair} handleDelete={handleDelete} />);

  const handleClick = () => {
    setAddingRepair(true);
  }

  const handleRepairSubmit = () => {
    setAddingRepair(false);
  }
  
  return (
    <div>
        <h1><u><i>Car Details</i></u></h1>
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
        <br />
            {addingRepair ? null : <button type="button" className="submit-btn" onClick={handleClick}>Add Repair</button>}
        <br />
        <br />
        <br />
            {addingRepair ? <RepairInput carId={car.id} handleRepairSubmit={handleRepairSubmit} /> : null}
     </div>
   )
 }

export default CarDetails;