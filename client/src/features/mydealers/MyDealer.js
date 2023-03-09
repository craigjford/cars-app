import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MyDealer({ dealer }) {

  const navigate = useNavigate();

  console.log('DEALER = ', dealer);

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {navigate('/')};

  const carsList = dealer.cars.map((car) => {
    return <h3 key={car.id}><u>Car: {car.year} {car.make} {car.model}</u></h3>
  })

  const handleDelete = (dealer) => {
      debugger;
  }

  const handleUpdate = (dealer) => {
      debugger;    
  }

  return (
    <div>
        <h3>Name: {dealer.name}</h3>
        <h3>Contact: {dealer.contact}</h3>
        <h3>Phone: {dealer.phone}</h3>
        <h3>Email: {dealer.email}</h3>
        <br />
            {carsList}
        <br />
        <button type="button" className="any-btn" onClick={() => handleDelete(dealer)}>Delete Dealer</button>
        <button type="button" className="any-btn" onClick={() => handleUpdate(dealer)}>Update Dealer</button>
        <br />
        <hr />
     </div>
   )
 }

export default MyDealer;