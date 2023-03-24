import React, { useState } from 'react';
import Car from "./Car";
import CarInput from "./CarInput";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { mydealerInitialized  } from "../mydealers/mydealersSlice";

function Cars() {
  const [addingCar, setAddingCar] = useState(false);

  const navigate = useNavigate();
  const users = useSelector((state) => state.user.entities);
  const user = users[0];
  
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const dispatch = useDispatch();
  dispatch(mydealerInitialized(user.id));

  const cars = useSelector((state) => state.cars.entities);
  const carsList = cars.map((car) => <Car key={car.id} car={car}/>)

  // const dealers = useSelector((state) => state.mydealers.entities);
  // console.log("dealers = ", dealers);

  const handleClick = () => {
    setAddingCar(true);
  }

  const handleCarInput = () => {
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
      <br />
      <br />
      {addingCar ? <CarInput handleCarInput={handleCarInput} /> : null}
    </div>
  )
}

export default Cars;