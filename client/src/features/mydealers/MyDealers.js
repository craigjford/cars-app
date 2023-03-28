import React from 'react';
import MyDealer from "./MyDealer";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function MyDealers() {  
  // dealers with cars

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const mydealers = useSelector((state) => state.mydealers.entities);

  const dealerList = mydealers.map((mydealer) => <MyDealer key={mydealer.id} dealer={mydealer}/>)

  return (
    <div className="App">
      <h1><i><u>My Dealers</u></i></h1>
        {dealerList.length > 0 ? dealerList : <h3>You Have No Cars Or Dealers</h3>}
      <br />
      <br />
    </div>
  )
}

export default MyDealers;