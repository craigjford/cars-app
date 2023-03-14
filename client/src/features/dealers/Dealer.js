import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dealer({ dealer }) {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {navigate('/')};

  return (
    <div>
        <h3>Name: {dealer.name}</h3>
        <h3>Contact: {dealer.contact}</h3>
        <h3>Phone: {dealer.phone}</h3>
        <h3>Email: {dealer.email}</h3>

        <hr />
     </div>
   )
 }

export default Dealer;