import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import UserSignUpForm from "./UserSignUpForm";
import Dealers from "./features/dealers/Dealers";
import CarInput from "./features/cars/CarInput";
import Cars from "./features/cars/Cars";
import { useSelector, useDispatch } from "react-redux";
import { fetchDealers } from "./features/dealers/dealersSlice";
import { userAdded } from "./features/user/userSlice";
import './App.css';

function App() {

  const userArr = useSelector((state) => state.user.entities);
  const user = userArr[0];
  const loggedIn = useSelector((state) => state.user.loggedIn);

  console.log('in App - user = ', user);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/me')
    .then(res => {
        if(res.ok) {
            res.json().then(user => {
              dispatch(userAdded(user));
              dispatch(fetchDealers());
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

  if (dealerStatus === "loading" || userStatus === "loading") return <h1>Loading....</h1>


  console.log('in App - user3 = ', user);
  console.log("in App - loggedIn - ", loggedIn);

  return (
    <>
      <main>
      <NavBar loggedIn={loggedIn} />
        {loggedIn ? (
          <Routes>
            <Route exact="true" path="/" element={<Home />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="mycars" element={<Cars />} />  
            <Route path="/cars/new" element={<CarInput />} />
            {/* <Route exact path="/alldealers" component={AllDealers} />
            <Route path="/dealers/new" component={AllDealerForm} />
            <Route exact path="/transactions" component={TransactionAll} />
            <Route exact path="/transactions/new" component={TransactionForm} />
            <Route path="/dealers/:dealer_id/transactions/delete" component={TransactionDelete} />
            <Route path="/dealers/:dealer_id/transactions/edit" component={TransactionUpdate} /> */}
            {/* <Route path="*">
                <h1>404 - Page Not Found</h1>
                <img src="https://bashooka.com/wp-content/uploads/2012/06/404-error-page-template-1.jpg" alt="Not Found" />
            </Route>   */}
          </Routes>
          ) : (  
          <Routes> 
            <Route exact="true" path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<UserSignUpForm />} />
            <Route path="*" element={<Home />} />
          </Routes>  
        )} 
      </main>
    </>

  )
}

export default App;


