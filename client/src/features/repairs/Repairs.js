import React from 'react';
import RepairItem from "./RepairItem";

import { useSelector } from "react-redux";

function Repairs() {
    const repairs = useSelector((state) => state.repairs.entities);

    console.log('repair = ', repairs)

    const repairList = repairs.map((repair) => {
      return <RepairItem key={repair.id} repair={repair} />
    })

  return (
    <div className="App">
      <h1><u><i>My Repairs</i></u></h1>
        {repairList}
    </div>
  )
}

export default Repairs;