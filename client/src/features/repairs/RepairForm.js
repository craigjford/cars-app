import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carRepairAdded } from "../cars/carsSlice";
import { repairAdded } from "./repairsSlice";

function RepairForm({ handleRepairSubmit}) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        car_id: "",
        shop_name: "",
        cost: "",
        service_desc: ""
    });

    const loggedIn = useSelector((state) => state.user.loggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};

    const cars = useSelector((state) => state.cars.entities);

    const carsList = cars.map((car) => (
        <option key={car.id} value={car.id}>{car.year} {car.make} {car.model}</option>
    ))

    const car = carsList[0];
    if (formData.car_id === "" && cars.length > 0) {
        setFormData({...formData, car_id: parseInt(car.key)});
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setFormData({...formData, [name]: e.target.value});
    } 

  const handleSubmit = (e) => {
    e.preventDefault();  

    fetch('/repairs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData), 
      })
      .then((res) => {
      if (res.ok) {
          res.json().then((data) => {
              dispatch(carRepairAdded(data))
              const repairObj =({...data, car: {id: data.car.id, user_id: data.car.user_id, dealer_id: data.car.dealer_id, year: data.car.year, make: data.car.make, model: data.car.model}})
              dispatch(repairAdded(repairObj));           
              handleRepairSubmit();
              setErrors([]);
          })
      } else {
          res.json().then((errors) => { 
              setErrors([]);
              setErrors(errors.errors);
          })
      }      
      });
  }

  return (
    <div>
        <> 
            <h1 className="formheader">Repair Add</h1>
            <form onSubmit={handleSubmit}>
                <label id="formlabel" htmlFor="cars">My Car:  </label>
                <select id="cars" name="car_id" value={formData.car_id} onChange={handleChange}>
                    {carsList}
                </select> 
                <br />
                <br />
                <label id="formlabel" htmlFor="shopname">Shop Name:  </label>
                <input type="text" id="shopname" name="shop_name" value={formData.shop_name} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="cost">Cost:  </label>
                <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="servicedesc">Service Description:  </label>
                <input type="text" id="servicedesc" name="service_desc" value={formData.service_desc} onChange={handleChange} />
                <br />
                <br />
                <br />
                <button type="submit" className="submit-btn">Add Repair</button>
                <button type="button" className="submit-btn" onClick={handleRepairSubmit}>Cancel</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </>
    </div>
  );
}

export default RepairForm;