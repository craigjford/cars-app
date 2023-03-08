import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { repairAdded } from "./repairsSlice";
// import { repairAdded } from "../cars/carsSlice";

function RepairInput() {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        cost: "",
        service_desc: ""
    })

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const cars = useSelector((state) => state.cars.entities)


    const dispatch = useDispatch();
    const params = useParams();

    let carArr = [];
    let car = "";
    

    if (cars.length > 0) {
        carArr = cars.filter((car) => parseInt(car.id) === parseInt(params.car_id)) 
        car = carArr[0];
    }

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
        fetch (`/cars/${car.id}/repairs`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...formData, car_id: params.car_id})
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(repairAdded(data))
                    initializeFormfields()
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
      
    const initializeFormfields = () => { 
        const clearInput = {
            cost: "",
            service_desc: ""
        }
        setFormData(clearInput);
    }

    if (!loggedIn) return <h1>Please Login or Sign Up</h1>;

  return (
        <div>    
            <main>
                <h3><u>Car</u></h3>
                <br />
                <h3>Year: {car.year}</h3>
                <h3>Brand: {car.brand}</h3>
                <h3>Model: {car.model}</h3>
            </main>
            <form onSubmit={handleSubmit}>
                <label>Cost: </label>
                <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                <br />
                <label>Contact: </label>
                <input type="text" id="service_desc" name="service_desc" value={formData.service_desc} onChange={handleChange} />
                <br />
                <br />
                <button type="submit">Add Repair</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default RepairInput;