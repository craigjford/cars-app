import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { dealerAdded } from "./dealersSlice";

function DealerInput({ setAddingDealer }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        phone: "",
        email: ""
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name
        setFormData({...formData, [name]: e.target.value})
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch ("/dealers", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(dealerAdded(data))
                    initializeFormfields()
                    setAddingDealer(false)
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
      
    const initializeFormfields = () => { 
        const clearInput = {
            name: "",
            contact: "",
            phone: "",
            email: ""
        }
        setFormData(clearInput);
    }

  return (
        <div>    
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <br />
                <label>Contact: </label>
                <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} />
                <br />
                <label>Phone: </label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                <br />
                <label>EMail: </label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                <br />
                <br />
                <br />
                <button type="submit" className="submit-btn">Add Dealer</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default DealerInput;