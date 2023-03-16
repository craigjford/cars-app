import React from 'react'

function RepairItem({ repair }) {

    return (
        <div>
            <h3>Shop Name: {repair.shop_name}</h3>
            <h3>Cost: {repair.cost}</h3>
            <h3>Service Description: {repair.service_desc}</h3>
            <h3>Car: {repair.car.year} {repair.car.make} {repair.car.model}</h3>
            <hr />
        </div>
    );
}

export default RepairItem