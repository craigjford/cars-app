import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dealerAdded } from "./dealersSlice";

function DealerInput({ setAddingDealer, handleCancel }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        phone: "",
        email: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.user.loggedIn);
    if (!loggedIn) {navigate('/')};

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
            <h1 className="formheader">Add A Dealer</h1>
            <br />  
            <form onSubmit={handleSubmit}>
                <label id="formlabel" htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="contact">Contact: </label>
                <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="phone">Phone: </label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                <br />
                <br />
                <label id="formlabel" htmlFor="email">EMail: </label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
                <br />
                <br />
                <br />
                <button type="submit" className="submit-btn">Add Dealer</button>
                <button type="button" className="any-btn" onClick={handleCancel}>Cancel</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default DealerInput;