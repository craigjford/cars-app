import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userAdded } from "./features/user/userSlice"

function UserSignUpForm() {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          }) 
          .then(res => {
            if (res.ok) {
                res.json().then(user => {
                  dispatch(userAdded(user)) 
                  initializeFormfields();
                  navigate('/');
                })
            } else { 
                res.json().then(err => setErrors(err.errors))   
            }  
        })
    }

    const initializeFormfields = () => { 
        const clearInput = {
            username: "",
            password: "",
            password_confirmation: "",
            first_name: "",
            last_name: ""
        }
        setFormData(clearInput);
    }

    const errorsList = errors.map((err) => <li style={{color:'red'}} key={err}>{err}</li>);

    return (
        <div>
          <h1 className="formheader">Welcome to the Sign Up Form</h1>
          <br />
          <form className="form" onSubmit={handleSubmit}>
          <label id="formlabel" htmlFor="username">Username:  </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
            />
          <br />
          <br />  
          <label id="formlabel" htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          <br />
          <br />  
          <label id="formlabel" htmlFor="password_confirmation">Password Confirmation: </label>
            <input
              type="password"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              autoComplete="current-password"
            />
          <br />
          <br /> 
          <label id="formlabel" htmlFor="firstname">First Name: </label>
            <input
              type="text"
              id="first_name"
              onChange={handleChange}
              value={formData.first_name}
            />
          <br />
          <br /> 
          <label id="formlabel" htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              id="last_name"
              onChange={handleChange}
              value={formData.last_name}
            />
          <br />
          <br /> 
          <br />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
          <div>
            <br />
            <br />
            <ul>
              {errorsList}
            </ul>
          </div>  
      </div>
      )
}

export default UserSignUpForm;