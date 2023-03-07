import React, { useState } from 'react';
import Dealer from "./Dealer";
import DealerInput from "./DealerInput";
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';


function Dealers() {
  const [addingDealer, setAddingDealer] = useState(false);

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const dealers = useSelector((state) => state.dealers.entities);

  const handleClick = () => {
    setAddingDealer(true);
  }

  return (
    <div className="App">
      <h1>Dealers page</h1>
        {dealers.map((dealer) => <Dealer key={dealer.id} dealer={dealer}/>)}
      <br />
      <br />
      {addingDealer ? null : <button type="button" onClick={handleClick}>Add Dealer</button>}
      <br />
      <br />
      <br />
      {addingDealer ? <DealerInput setAddingDealer={setAddingDealer} /> : null}
    </div>
  )
}

export default Dealers;