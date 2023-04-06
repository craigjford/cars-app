import React, { useState } from 'react';
import Dealer from "./Dealer";
import DealerInput from "./DealerInput";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { dealerRemoved } from './dealersSlice';

function Dealers() {
  const [addingDealer, setAddingDealer] = useState(false);

  // dealers with cars

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const dealers = useSelector((state) => state.dealers.entities);

  const handleClick = () => {
    setAddingDealer(true);
  }

  const handleCancel = () => {
    setAddingDealer(false);
  }

  const handleDelete = (id) => {
    // debugger 
    fetch(`/dealers/${id}`, 
       { method: "DELETE" })
       .then((r) => {
         if (r.ok) {
          dispatch(dealerRemoved(id))
          setAddingDealer(false);
         }
       });     
  }

  return (
    <div className="App">
      <h1><i><u>All Dealers</u></i></h1>
      <br />
        {dealers.map((dealer) => <Dealer key={dealer.id} dealer={dealer} handleDelete={handleDelete} />)}
      <br />
      <br />
      {addingDealer ? null : <button type="button" className="submit-btn" onClick={handleClick}>Add Dealer</button>}
      <br />
      <br />
      {addingDealer ? <DealerInput setAddingDealer={setAddingDealer} handleCancel={handleCancel} /> : null}
    </div>
  )
}

export default Dealers;