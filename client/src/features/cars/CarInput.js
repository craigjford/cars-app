import React, { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { carAdded } from "./carsSlice";

function CarInput({ user }) {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        user_id: user.id,
        dealer_id: "",
        year: "",
        make: "", 
        model: ""
    })

    const dealers = useSelector((state) => state.dealers.entities);
    const dispatch = useDispatch();
    console.log('dealers ', dealers);

    const handleChange = (e) => {
        const name = e.target.name
        setFormData({...formData, [name]: e.target.value})
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger
        fetch ("/cars", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(carAdded(data))
                    initializeFormfields()
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }
      
    const initializeFormfields = () => { 
        const clearInput = {
            user_id: user.id,
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
                {/* <label>Dealer: </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                <br /> */}
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
                <button type="submit">Submit</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default CarInput;