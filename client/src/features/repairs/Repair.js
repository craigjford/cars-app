import React from "react";

function Repair({ repair, handleDelete, handleUpdate }) {

  const repairDelete = (repair) => {
    handleDelete(repair);
  }

  const repairUpdate = (repair) => {
    debugger
    handleUpdate(repair);
  }

  return (
    <div>
        <h3>Garage Name: {repair.shop_name}</h3>
        <h3>Repair Cost: {repair.cost}</h3>
        <h3>Service Description: {repair.service_desc}</h3>
        <button type="button" onClick={() => repairDelete(repair)}>Delete Repair</button>
        <br />
        <button type="button" onClick={() => repairUpdate(repair)}>Update Repair</button>
        <hr />
    </div>
  );
}

export default Repair;