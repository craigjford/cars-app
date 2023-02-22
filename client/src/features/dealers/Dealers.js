import React, { useEffect } from 'react';
import DealerList from "./DealerList"
import { useDispatch } from "react-redux"
import { fetchDealers } from "./dealersSlice";

function Dealers() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDealers())
  })

  return (
    <div className="App">
        <DealerList />
    </div>
  )
}

export default Dealers