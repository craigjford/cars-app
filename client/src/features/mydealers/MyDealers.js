import React, { useState } from 'react';
import MyDealer from "./MyDealer";
import MyDealerInput from "./MyDealerInput";
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

function MyDealers() {
  const [addingDealer, setAddingDealer] = useState(false);

  // dealers with cars

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const mydealers = useSelector((state) => state.mydealers.entities);
  console.log('DEALERS = ', mydealers);

  const handleClick = () => {
    setAddingDealer(true);
  }

  return (
    <div className="App">
      <h1>Dealers page</h1>
        {mydealers.map((mydealer) => <MyDealer key={mydealer.id} dealer={mydealer}/>)}
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