import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RepairItem({ repair }) {

    const loggedIn = useSelector((state) => state.user.loggedIn);

    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};

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