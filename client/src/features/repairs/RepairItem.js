import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carRepairRemoved } from "../cars/carsSlice";
import { repairRemoved } from './repairsSlice';

function RepairItem({ repair }) {

    const loggedIn = useSelector((state) => state.user.loggedIn);

    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};

    const dispatch = useDispatch();

    const handleDelete = () => {
        fetch(`/repairs/${repair.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            dispatch(carRepairRemoved(repair))
            dispatch(repairRemoved(repair))            
          }
        });
    }
    
    const repairUpdate = (repair) => {
        navigate(`/cars/${repair.car_id}/repairs/${repair.id}/edit`)
    }

    return (
        <div>
            <h3>Shop Name: {repair.shop_name}</h3>
            <h3>Cost: {repair.cost}</h3>
            <h3>Service Description: {repair.service_desc}</h3>
            <h3>Car: {repair.car.year} {repair.car.make} {repair.car.model}</h3>
            <br />
            <button type="button" className="any-btn" onClick={handleDelete}>Delete Repair</button>
            <button type="button" className="any-btn" onClick={() => repairUpdate(repair)}>Update Repair</button>
            <br />
            <br />
            <hr />
        </div>
    );
}

export default RepairItem;