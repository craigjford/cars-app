import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carRepairAdded } from "../cars/carsSlice";
import { repairAdded } from "./repairsSlice";

function RepairInput({ car, handleRepairSubmit }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        shop_name: "",
        cost: "",
        service_desc: ""
    });

    // const carObj = {id: car.id, user_id: car.user_id, dealer_id: car.dealer_id, year: car.year, make: car.make, model: car.model};
    // console.log(("carObj = ", carObj))

    const loggedIn = useSelector((state) => state.user.loggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!loggedIn) {navigate('/')};

    const handleChange = (e) => {
        const name = e.target.name;
        setFormData({...formData, [name]: e.target.value})
    } 

  const handleSubmit = (e) => {

    e.preventDefault();  

    fetch(`/repairs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
          ...formData,
          car_id: car.id
      }),
      })
      .then((res) => {
      if (res.ok) {
          res.json().then((data) => {
              dispatch(carRepairAdded(data))
              const repairObj =({...data, car: {id: car.id, user_id: car.user_id, dealer_id: car.dealer_id,
                            year: car.year, make: car.make, model: car.model}})
              dispatch(repairAdded(repairObj));             
              initializeFormfields();
              handleRepairSubmit();
              setErrors([])
          })
      } else {
          res.json().then((errors) => { 
              setErrors([])
              setErrors(errors.errors)
          })
      }      
      });
  }

  const initializeFormfields = () => { 
    const clearInput = {
        shop_name: "",
        cost: "",
        service_desc: ""
    }
    setFormData(clearInput);
  }

  return (
    <div>
        <> 
            <h1 className="formheader">Repair Add</h1>
            <form onSubmit={handleSubmit}>
                <label id="formlabel" htmlFor="shopname">Shop Name: </label>
                <input type="text" id="shopname" name="shop_name" value={formData.shop_name} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="cost">Cost: </label>
                <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="servicedesc">Service Description: </label>
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

export default RepairInput;