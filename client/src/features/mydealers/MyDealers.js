import React, { useState } from 'react';
import MyDealer from "./MyDealer";
import MyDealerInput from "./MyDealerInput";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function MyDealers() {
  const [addingDealer, setAddingDealer] = useState(false);

  // dealers with cars

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const mydealers = useSelector((state) => state.mydealers.entities);

  const dealerList = mydealers.map((mydealer) => <MyDealer key={mydealer.id} dealer={mydealer}/>)

  const handleClick = () => {
    setAddingDealer(true);
  }

  return (
    <div className="App">
      <h1><i><u>My Dealers</u></i></h1>
        {dealerList.length > 0 ? dealerList : <h3>You Have No Cars Or Dealers</h3>}
      <br />
      <br />
      {addingDealer ? null : <button type="button" className="submit-btn" onClick={handleClick}>Add Dealer</button>}
      <br />
      <br />
      <br />
      {addingDealer ? <MyDealerInput setAddingDealer={setAddingDealer} /> : null}
    </div>
  )
}

export default MyDealers;