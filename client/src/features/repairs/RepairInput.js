import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { repairAdded } from "./repairsSlice";
import { carRepairAdded } from "../cars/carsSlice";

function RepairInput({ carId, setAddingRepair }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        shop_name: "",
        cost: "",
        service_desc: ""
    })

    const loggedIn = useSelector((state) => state.user.loggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;

        if (name === "cost") {
            setFormData({...formData, [name]: parseInt(e.target.value)})
        } else {
            setFormData({...formData, [name]: e.target.value})
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch ("/repairs", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...formData, car_id: carId})
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(carRepairAdded(data))
                    dispatch(repairAdded(data))
                    initializeFormfields();
                    setAddingRepair(false);
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
      
    const initializeFormfields = () => { 
        const clearInput = {
            shop_name: "",
            cost: "",
            service_desc: ""
        }
        setFormData(clearInput);
    }

    if (!loggedIn) {navigate('/')};

  return (
        <div>    
            <br />
            <form onSubmit={handleSubmit}>
                <label>Shop Name: </label>
                <input type="text" id="shop_name" name="shop_name" value={formData.shop_name} onChange={handleChange} />
                <br />
                <label>Cost: </label>
                <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                <br />
                <label>Service Description: </label>
                <input type="text" id="service_desc" name="service_desc" value={formData.service_desc} onChange={handleChange} />
                <br />
                <br />
                <button type="submit" className="submit-btn">Add Repair</button>
                <button type="button" className="submit-btn" onClick={() => setAddingRepair(false)}>Cancel</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default RepairInput;