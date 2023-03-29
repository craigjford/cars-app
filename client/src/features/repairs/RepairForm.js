import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carRepairAdded } from "../cars/carsSlice";
import { repairAdded } from "./repairsSlice";

function RepairForm({ handleRepairSubmit}) {
    const [errors, setErrors] = useState([]);
    const [carObj, setCarObj] = useState({});
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

        if (e.target.name === "car_id") {
            setFormData({...formData, [name]: parseInt(e.target.value)})
            let selCarArr = cars.filter((car) => car.id === parseInt(e.target.value));
            let selCar = selCarArr[0];
            setCarObj({id: selCar.id, user_id: selCar.user_id, dealer_id: selCar.dealer_id, year: selCar.year, make: selCar.make, model: selCar.model})   
        }

        if (name === "cost") {
            setFormData({...formData, [name]: parseInt(e.target.value)})
        } else {
            setFormData({...formData, [name]: e.target.value})
        }
    } 

  const handleSubmit = (e) => {
    e.preventDefault();  

    fetch(`/repairs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData), 
      })
      .then((res) => {
      if (res.ok) {
          res.json().then((data) => {
              debugger
              dispatch(carRepairAdded(data))
              const repairObj =({...data, car: {id: carObj.id, user_id: carObj.user_id, dealer_id: carObj.dealer_id, year: carObj.year, make: carObj.make, model: carObj.model}})
              dispatch(repairAdded(repairObj));           
              handleRepairSubmit();
              setErrors([])
          })
      } else {
          res.json().then((errors) => { 
              setErrors(errors.errors)
          })
      }      
      });
  }

  return (
    <div>
        <> 
            <form onSubmit={handleSubmit}>
                <label>My Car: </label>
                <select id="cars" name="car_id" value={formData.car_id} onChange={handleChange}>
                    {carsList}
                </select> 
                <br />
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