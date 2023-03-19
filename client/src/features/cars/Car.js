import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { carRemoved } from "./carsSlice";  
import { mydealerCarRemoved } from "../mydealers/mydealersSlice";
import { repairCarRemoved } from "../repairs/repairsSlice";  

function Car({ car }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  if (!loggedIn) {navigate('/')};

  const handleDelete = () => {
    // console.log('in delete car = ', car);
    // debugger
    // fetch(`/cars/${car.id}`, {
    //   method: "DELETE",
    // }).then((res) => {
    //   if (res.ok) {
        dispatch(carRemoved(car))
        dispatch(mydealerCarRemoved(car)) 
        dispatch(repairCarRemoved(car))         
    //   }
    // });
  }

  const handleUpdate = () => {
    console.log('in handle car = ', car);
  }

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
        <button type="button" className="any-btn" onClick={handleDelete}>Delete Car</button>
        <button type="button" className="any-btn" onClick={handleUpdate}>Update Car</button>
        <br />
        <br />
        <hr />
     </div>
   )
 }

export default Car;