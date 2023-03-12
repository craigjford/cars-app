import React, { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carAdded } from "./carsSlice";

function CarInput({ handleCarInput }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        dealer_id: "",
        year: "",
        make: "", 
        model: ""
    })

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const dealers = useSelector((state) => state.dealers.entities);
    const userArr = useSelector((state) => state.user.entities);
    const user = userArr[0];

    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    if (!loggedIn) {navigate('/')};

    const dealerList = dealers.map((dealer) => (
        <option key={dealer.id} value={dealer.id}>{dealer.name}</option>
    ))

    const handleChange = (e) => {
        const name = e.target.name
        if (e.target.name === "dealer_id") {
            setFormData({...formData, [name]: parseInt(e.target.value)})
        } else {
            setFormData({...formData, [name]: e.target.value})
        }    
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch ("/cars", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...formData, user_id: user.id})
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(carAdded(data))
                    initializeFormfields()
                    handleCarInput()
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
      
    const initializeFormfields = () => { 
        const clearInput = {
            dealer_id: "",
            year: "",
            make: "", 
            model: ""
        }
        setFormData(clearInput);
    }

  return (
        <div>    
            <form onSubmit={handleSubmit}>
                <label>Dealer: </label>
                <select id="dealers" name="dealer_id" onChange={handleChange}>
                    {dealerList}
                </select>    
                <br />
                <label>Year: </label>
                <input type="text" id="year" name="year" value={formData.year} onChange={handleChange} />
                <br />
                <label>Make: </label>
                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} />
                <br />
                <label>Model: </label>
                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} />
                <br />
                <br />
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default CarInput;