import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Home from "./Home";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import UserSignUpForm from "./UserSignUpForm";
// import Dealers from "./features/dealers/Dealers";
import { useDispatch } from "react-redux";
// import { fetchDealers } from "./features/dealers/dealersSlice";
import { userAdded } from "./features/users/usersSlice";
import './App.css';

function App() {
  const [userFound, setUserFound] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/me')
    .then(res => {
        if(res.ok) {
            res.json().then(user => {
                dispatch(userAdded(user));
                setUserFound(true)
            })
        } else {
            res.json().then(error => {
                setUserFound(false)
            })
        }   
    })
  }, [dispatch])
  
  
  // useEffect(() => {
  //   dispatch(fetchDealers())
  // })

  // if (loading) {return <h1>Loading....</h1>;}

  return (
    <>
      <main>
        <NavBar userFound={userFound} />
        <Routes>
            <Route exact="true" path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<UserSignUpForm />} />
        </Routes>
      </main>
    </>

  )
}

export default App;


