import React, { useState, useEffect } from 'react';
import Dealer from "./Dealer";
import DealerInput from "./DealerInput";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchDealers } from "./dealersSlice";

function Dealers() {
  const [addingDealer, setAddingDealer] = useState(false);

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(fetchDealers())
  }, [dispatch])

  const dealers = useSelector((state) => state.dealers.entities);
  const status = useSelector((state) => state.dealers.status);

  if (status === "loading") {<h1>Loading....</h1>}

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