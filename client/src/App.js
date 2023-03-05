import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import UserSignUpForm from "./UserSignUpForm";
import Dealers from "./features/dealers/Dealers";
import CarInput from "./features/cars/CarInput";
import { useSelector, useDispatch } from "react-redux";
// import { fetchDealers } from "./features/dealers/dealersSlice";
import { userAdded } from "./features/user/userSlice";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const userArr = useSelector((state) => state.user.entities);
  const user = userArr[0];
  console.log("loggedIn User ZZZZZZZZZZZZZ = ", user);

  // const dealers = useSelector((state) => state.dealers.entities);
  // const isLoading = useSelector((state) => state.dealers.status === "loading");
  // if (isLoading) return <p>Loading...</p>;


  console.log('in App - user = ', user);

  const dispatch = useDispatch();


  // useEffect(() => {
  //   fetch('/me')
  //   .then(res => {
  //       if(res.ok) {
  //           res.json().then(userMe => {
  //               console.log("in useEffect - user = ", user.length)
  //               if (user.length < 1) {
  //                 console.log("in useEffect if - dispatch - ", user.length )
  //                 dispatch(userAdded(userMe));
  //               } else {
  //                 console.log("in useEffect else - dispatch -  ", user.length)
  //               }
  //           })
  //       } else {
  //           res.json().then(error => {
  //               console.log("/me error = ", error)
  //           })
  //       }   
  //   })
  // }, [dispatch, user])

  useEffect(() => {
    fetch('/me')
    .then(res => {
        if(res.ok) {
            res.json().then(user => {
              setLoggedIn(true);
              dispatch(userAdded(user));
            })
        } else {
            res.json().then(error => {
                setLoggedIn(false)
                console.log("/me error = ", error)
            })
        }   
    })
  }, [dispatch])

  console.log('in App - user2 = ', user);

  if (loggedIn) {
    console.log('in App loggedIn - user = ', user)
    // dispatch(userAdded(userMe));
  }

  // if (isLoading) return <p>Loading...</p>;
  console.log('in App - user3 = ', user);
  console.log("in App - loggedIn - ", loggedIn);

  return (
    <>
      <main>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
        {loggedIn ? (
          <Routes>
            <Route exact="true" path="/" element={<Home user={user} loggedIn={loggedIn} />} />
            <Route path="/dealers" element={<Dealers user={user} />} />
            <Route path="/cars/new" element={<CarInput user={user} />} />
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
            <Route exact="true" path="/" element={<Home loggedIn={loggedIn} />} />
            <Route path="/login" element={<LogIn setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<UserSignUpForm setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<Home loggedIn={loggedIn} />} />
          </Routes>  
        )} 
      </main>
    </>

  )
}

export default App;


