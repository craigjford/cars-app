import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { carRepairUpdated } from "../cars/carsSlice";

function RepairUpdate() {
    const [errors, setErrors] = useState([]);
    const [shopName, setShopName] = useState("");
    const [cost, setCost] = useState("");
    const [serviceDesc, setServiceDesc] = useState("");
    const [stateInitialized, setStateInitialized] = useState(false);

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const cars = useSelector((state) => state.cars.entities);

    const params = useParams();
    const carId = parseInt(params.car_id);

    const filteredCar = cars.filter((c) => c.id === carId);
    const car = filteredCar[0];
    console.log("car  = ", car);

    const repairId = parseInt(params.repair_id);

    const filteredRepair = car.repairs.filter((rep) => rep.id === repairId);
    const repair = filteredRepair[0];

    if (!stateInitialized) {
        setShopName(repair.shop_name);
        setCost(repair.cost);
        setServiceDesc(repair.service_desc);
        setStateInitialized(true);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(`/cars/${car.id}/edits`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch (`/repairs/${repairId}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            car_id: carId,
            shop_name: shopName,
            cost: parseInt(cost),
            service_desc: serviceDesc
          })
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(carRepairUpdated(data))
                    navigate(`/cars/${car.id}/edits`)
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

    if (!loggedIn) {navigate('/')};

  return (
        <div>  
          <>
            <h3><u>Car Repair Update For</u></h3>
            <h3>{car.year}  {car.make}  {car.model}</h3>
          </>    
            <br />
            <form onSubmit={handleSubmit}>
                <label>Shop Name: </label>
                <input type="text" id="shop_name" name="shop_name" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                <br />
                <label>Cost: </label>
                <input type="text" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
                <br />
                <label>Service Description: </label>
                <input type="text" id="service_desc" name="service_desc" value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} />
                <br />
                <br />
                <button type="submit" className="submit-btn">Update Repair</button>
                <button type="button" className="submit-btn" onClick={handleCancel}>Cancel</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default RepairUpdate;