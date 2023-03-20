import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import UserSignUpForm from "./UserSignUpForm";
import Dealers from "./features/dealers/Dealers";
import MyDealers from "./features/mydealers/MyDealers";
import Cars from "./features/cars/Cars";
import CarDetails from "./features/cars/CarDetails";
import CarUpdate from "./features/cars/CarUpdate";
import RepairUpdate from "./features/repairs/RepairUpdate";
import RepairShow from "./features/repairs/RepairShow";
import Repairs from "./features/repairs/Repairs";
import { useSelector, useDispatch } from "react-redux";
import { fetchDealers } from "./features/dealers/dealersSlice";
import { fetchCars } from "./features/cars/carsSlice";
import { fetchmyDealers } from "./features/mydealers/mydealersSlice";
import { userAdded } from "./features/user/userSlice";
import { fetchRepairs } from "./features/repairs/repairsSlice";
import './App.css';

function App() {

  const userArr = useSelector((state) => state.user.entities);
  const user = userArr[0];
  const loggedIn = useSelector((state) => state.user.loggedIn);

  console.log("in App - user = ", user);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/me')
    .then(res => {
        if(res.ok) {
            res.json().then(user => {
              dispatch(userAdded(user));
              dispatch(fetchDealers());
              dispatch(fetchCars());
              dispatch(fetchmyDealers());
              dispatch(fetchRepairs());
            })
        } else {
            res.json().then(error => {
                console.log("/me error = ", error)
            })
        }   
    })
  }, [dispatch])

  const userStatus = useSelector((state) => state.user.status)
  const dealerStatus = useSelector((state) => state.dealers.status);
  const carsStatus = useSelector((state) => state.cars.status);
  const mydealersStatus = useSelector((state) => state.cars.status);
  const repairsStatus = useSelector((state) => state.cars.status);

  if (dealerStatus === "loading" || userStatus === "loading" || carsStatus === "loading" || mydealersStatus === "loading" || repairsStatus === "loading") {
      return <h1>Loading....</h1>
  }  

  // used for invalid route
  const isTrue = true;

  return (
    <>
      <main>
      <NavBar loggedIn={loggedIn} />
        {loggedIn ? (
          <Routes>
            <Route exact="true" path="/" element={<Home isHome={isTrue} />} />
            <Route path="/mydealers" element={<MyDealers />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/mycars" element={<Cars />} />  
            <Route path="/cars/:car_id" element={<CarDetails /> } />
            <Route path="/cars/:car_id/edits" element={<CarUpdate /> } />
            <Route path="/cars/:car_id/repairs/:repair_id/edit" element={<RepairUpdate />} /> 
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/repairs/:repair_id/show" element={<RepairShow />} /> 
            <Route path="*" element={<Home patch="*" isHome={!isTrue}/>} />
          </Routes>
          ) : (  
          <Routes> 
            <Route exact="true" path="/" element={<Home isHome={isTrue} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<UserSignUpForm />} />
            <Route path="*" element={<Home path="*" isHome={!isTrue} />} />
          </Routes>  
        )} 
      </main>
    </>

  )
}

export default App;


