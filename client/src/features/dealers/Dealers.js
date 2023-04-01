import React, { useState } from 'react';
import Dealer from "./Dealer";
import DealerInput from "./DealerInput";
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

function Dealers() {
  const [addingDealer, setAddingDealer] = useState(false);

  // dealers with cars

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const dealers = useSelector((state) => state.dealers.entities);

  const handleClick = () => {
    setAddingDealer(true);
  }

  const handleCancel = () => {
    setAddingDealer(false);
  }

  return (
    <div className="App">
      <h1><i><u>All Dealers</u></i></h1>
      <br />
        {dealers.map((dealer) => <Dealer key={dealer.id} dealer={dealer}/>)}
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