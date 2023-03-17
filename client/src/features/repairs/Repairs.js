import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RepairItem from "./RepairItem";

function Repairs() {
    const repairs = useSelector((state) => state.repairs.entities);
    const loggedIn = useSelector((state) => state.user.loggedIn);

    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};

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