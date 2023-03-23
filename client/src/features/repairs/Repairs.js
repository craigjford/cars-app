import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RepairItem from "./RepairItem";
import RepairForm from "./RepairForm";

function Repairs() {
  const [addingRepair, setAddingRepair] = useState(false);

    const repairs = useSelector((state) => state.repairs.entities);
    const loggedIn = useSelector((state) => state.user.loggedIn);

    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};
    
    const repairList = repairs.map((repair) => {
      return <RepairItem key={repair.id} repair={repair} />
    })

    const handleClick = () => {
      setAddingRepair(true);
    }
  
    const handleRepairSubmit = () => {
      setAddingRepair(false);
    }

  return (
    <div className="App">
      <h1><u><i>My Repairs</i></u></h1>
            {repairList.length > 0 ? repairList : <h3>You Have No Repairs</h3>}
        <br />
        <br />
            {addingRepair ? null : <button type="button" className="submit-btn" onClick={handleClick}>Add Repair</button>}
            {addingRepair ? <RepairForm handleRepairSubmit={handleRepairSubmit} /> : null}
    </div>
  )
}

export default Repairs;