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

  const handleClick = () => {
    setAddingCar(true);
  }

  const handleCarInput = () => {
    setAddingCar(false);
  }

  return (
    <div className="App">
      <h1><u><i>My Cars</i></u></h1>
        {cars.map((car) => <Car key={car.id} car={car}/>)}
      <br />
      <br />
      {addingCar ? null : <button type="button" className="submit-btn" onClick={handleClick}>Add Car</button>}
      <br />
      <br />
      <br />
      {addingCar ? <CarInput handleCarInput={handleCarInput} /> : null}
    </div>
  )
}

export default Cars;