import React, { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { carAdded } from "./carsSlice";
import { mydealerCarAdded } from "../mydealers/mydealersSlice";

function CarInput({ handleCarInput, handleCancel }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        dealer_id: "",
        year: "",
        make: "", 
        model: ""
    })

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const navigate = useNavigate();

    const userArr = useSelector((state) => state.user.entities);
    const user = userArr[0];

    const dealers = useSelector((state) => state.dealers.entities);

    const dispatch = useDispatch();
  
    if (!loggedIn) {navigate('/')};

    const dealerList = dealers.map((dealer) => (
        <option key={dealer.id} value={dealer.id}>{dealer.name}</option>
    ))

    const dlr = dealerList[0];
    if (formData.dealer_id === "" && dealers.length > 0) {
        setFormData({...formData, dealer_id: parseInt(dlr.key)});
    }

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
                    const myDealerObj =({id: data.dealer.id, name:data.dealer.name, contact: data.dealer.contact, phone: data.dealer.phone, 
                        email: data.dealer.email, car: {id: data.id, user_id: data.user_id, dealer_id: data.dealer_id,
                        year: data.year, make: data.make, model: data.model}})
                    dispatch(mydealerCarAdded(myDealerObj))    
                    handleCarInput()
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
      
  return (
        <div> 
            <h1 className="formheader">Add A Car</h1>
            <br />   
            <form onSubmit={handleSubmit}>
                <label id="formlabel" htmlFor="dealers">Dealer: </label>
                <select id="dealers" name="dealer_id" value={formData.dealer_id} onChange={handleChange}>
                    {dealerList}
                </select>    
                <br />
                <br />
                <label id="formlabel" htmlFor="year">Year: </label>
                <input type="text" id="year" name="year" value={formData.year} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="make">Make: </label>
                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="model">Model: </label>
                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} />
                <br />
                <br />
                <br />
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="any-btn" onClick={handleCancel}>Cancel</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default CarInput;