import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { carRepairUpdated } from "../cars/carsSlice";
import { repairUpdated } from "../repairs/repairsSlice";

function RepairUpdate() {
    const [errors, setErrors] = useState([]);
    const [shopName, setShopName] = useState("");
    const [cost, setCost] = useState("");
    const [serviceDesc, setServiceDesc] = useState("");
    const [stateInitialized, setStateInitialized] = useState(false);

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};

    const cars = useSelector((state) => state.cars.entities);

    const params = useParams();
    const carId = parseInt(params.car_id);

    const filteredCar = cars.filter((c) => c.id === carId);
    const car = filteredCar[0];

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

    const handleCancel = () => {
        // navigate(`/cars/${car.id}/edits`)
        navigate(-1);
    }

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        fetch (`/repairs/${repairId}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            car_id: carId,
            shop_name: shopName,
            cost: cost,
            service_desc: serviceDesc
          })
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(carRepairUpdated(data))
                    const repairObj =({...data, car: {id: car.id, user_id: car.user_id, dealer_id: car.dealer_id,
                                  year: car.year, make: car.make, model: car.model}})
                    dispatch(repairUpdated(repairObj)) 
                    // navigate(`/cars/${car.id}/edits`)
                    navigate(-1);
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

  return (
        <div>  
            <h1 className="formheader">Car Repair Update For</h1>
            <h3><u>{car.year}  {car.make}  {car.model}</u></h3> 
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label id="formlabel" htmlFor="shopname">Shop Name: </label>
                <input type="text" id="shopname" name="shop_name" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                <br />
                <br />
                <label id="formlabel" htmlFor="cost">Cost: </label>
                <input type="text" id="cost" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
                <br />
                <br />
                <label id="formlabel" htmlFor="servicedesc">Service Description: </label>
                <input type="text" id="servicedesc" name="service_desc" value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} />
                <br />
                <br /><br />
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