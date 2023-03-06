import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function Dealer({ dealer }) {

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);
  if (!loggedIn) {navigate('/')};

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
        <button type="button" onClick={() => handleDelete(dealer)}>Delete Dealer</button>
        <button type="button" onClick={() => handleUpdate(dealer)}>Update Dealer</button>
        <br />
        <hr />
     </div>
   )
 }

export default Dealer;



