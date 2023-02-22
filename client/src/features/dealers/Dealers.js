import React from 'react';
import DealerList from "./DealerList"
import { useSelector} from "react-redux"

function Dealers() {
  const dealers = useSelector((state) => state.dealers.entities);
  console.log('dealers = ', dealers);

  return (
    <div className="App">
      <h1>Dealers page</h1>
        {dealers.map((dealer) => <DealerList key={dealer.id} dealer={dealer}/>)}

    </div>
  )
}

export default Dealers