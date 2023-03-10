import React from "react";

function Repair({ repair }) {
  return (
    <div>
        <h3>Garage Name: {repair.shop_name}</h3>
        <h3>Repair Cost: {repair.cost}</h3>
        <h3>Service Description: {repair.service_desc}</h3>
    </div>
  );
}

export default Repair;