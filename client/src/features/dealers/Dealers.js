import React, { useState } from 'react';
import DealerList from "./DealerList";
import DealerInput from "./DealerInput";
import { useSelector} from "react-redux";

function Dealers() {
  const [addingDealer, setAddingDealer] = useState(false)
  const dealers = useSelector((state) => state.dealers.entities);
  console.log('dealers = ', dealers);

  const handleClick = () => {
    console.log('handleClick = ', addingDealer);
    setAddingDealer(true);
    console.log('handleClick2 = ', addingDealer);
  }

  const handleSubmit = () => {
    setAddingDealer(false);
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
      {addingDealer ? <DealerInput onSubmit={handleSubmit} /> : null}
    </div>
  )
}

export default Dealers;