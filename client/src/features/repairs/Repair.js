import React from "react";
import { useNavigate } from "react-router-dom";

function Repair({ repair, handleDelete }) {

  const navigate = useNavigate();

  const repairShow = (repair) => {
    navigate(`/repairs/${repair.id}/show`)
  }

  const repairDelete = (repair) => {
    handleDelete(repair);
  }

  const repairUpdate = (repair) => {
    navigate(`/cars/${repair.car_id}/repairs/${repair.id}/edit`)
  }

  return (
    <div>
        <h3>Garage Name: {repair.shop_name}</h3>
        <h3>Repair Cost: {repair.cost}</h3>
        <h3>Service Description: {repair.service_desc}</h3>
        <br />
        <button type="button" className="any-btn" onClick={() => repairShow(repair)}>Show Repair</button>
        <br />
        <button type="button" className="any-btn" onClick={() => repairDelete(repair)}>Delete Repair</button>
        <br />
        <button type="button" className="any-btn" onClick={() => repairUpdate(repair)}>Update Repair</button>
        <br />
        <br />
        <hr />
    </div>
  );
}

export default Repair;