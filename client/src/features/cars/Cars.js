import React, { useState } from 'react';
import Car from "./Car";
import CarInput from "./CarInput";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Cars() {
  const [addingCar, setAddingCar] = useState(false);

  const navigate = useNavigate();
  
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const cars = useSelector((state) => state.cars.entities);
  const carsList = cars.map((car) => <Car key={car.id} car={car}/>)

  const handleClick = () => {
    setAddingCar(true);
  }

  const handleCarInput = () => {
    setAddingCar(false);
  }

  const handleCancel = () => {
    setAddingCar(false);
  }

  return (
    <div className="App">
      <h1><u><i>My Cars</i></u></h1>
        {carsList.length > 0 ? carsList : <h3>You Have No Cars</h3>}
      <br />
      <br />
      {addingCar ? null : <button type="button" className="submit-btn" onClick={handleClick}>Add Car</button>}
      <br />
      {addingCar ? <CarInput handleCarInput={handleCarInput} handleCancel={handleCancel} /> : null}
    </div>
  )
}

export default Cars;