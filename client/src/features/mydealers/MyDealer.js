import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MyDealer({ dealer }) {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {navigate('/')};

  const carsList = dealer.cars.map((car) => {
    return <h3 key={car.id}>Car: {car.year} {car.make} {car.model}</h3>
  })

  return (
    <div>
        <br />
        <h2><u>Name: {dealer.name}</u></h2>
        <h3>Contact: {dealer.contact}</h3>
        <h3>Phone: {dealer.phone}</h3>
        <h3>Email: {dealer.email}</h3>
        <h2><i><u>My Cars</u></i></h2>
            {carsList}
        <br />
        <hr />
     </div>
   )
 }

export default MyDealer;