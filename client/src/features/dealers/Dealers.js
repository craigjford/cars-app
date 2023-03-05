import React, { useState, useEffect } from 'react';
import DealerList from "./Dealer";
import DealerInput from "./DealerInput";
import { useSelector, useDispatch} from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { fetchDealers } from "./dealersSlice";

function Dealers({ user }) {
  const [addingDealer, setAddingDealer] = useState(false);

  console.log('in Dealers - user = ', user);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(fetchDealers())
  }, [dispatch])

  // if (!user) {navigate('/')};

  const dealers = useSelector((state) => state.dealers.entities);
  const status = useSelector((state) => state.dealers.status);
  console.log('dealers = ', dealers);
  console.log('status = ', status);

  const handleClick = () => {
    console.log('handleClick = ', addingDealer);
    setAddingDealer(true);
    console.log('handleClick2 = ', addingDealer);
  }

  return (
    <div className="App">
      <h1>Dealers page</h1>
        {dealers.map((dealer) => <DealerList key={dealer.id} dealer={dealer}/>)}
      <hr />
      {addingDealer ? null : <button type="button" onClick={handleClick}>Add Dealer</button>}
      <br />
      <br />
      <br />
      {addingDealer ? <DealerInput setAddingDealer={setAddingDealer} /> : null}
    </div>
  )
}

export default Dealers;