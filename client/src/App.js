import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Home from "./Home";
import NavBar from "./NavBar";
import LogIn from "./LogIn";
import UserSignUpForm from "./UserSignUpForm";
import Dealers from "./features/dealers/Dealers";
import CarInput from "./features/cars/CarInput";
import { useDispatch } from "react-redux";
// import { fetchDealers } from "./features/dealers/dealersSlice";
import { userAdded } from "./features/user/userSlice";
import './App.css';

function App() {
  const [user, setUser] = useState("");
  // const [errors, setErrors] = useState("");

  // const dealers = useSelector((state) => state.dealers.entities);
  // const isLoading = useSelector((state) => state.dealers.status === "loading");

  // function handleClick() {
  //   // dispatch the action creator (see below!)
  //   dispatch(fetchAstronauts());
  // }

  // if (isLoading) return <p>Loading...</p>;

  // const users = useSelector((state) => state.users.entities);
  // const user = users[0];

  console.log('in App - user = ', user);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/me')
    .then(res => {
        if(res.ok) {
            res.json().then(user => {
                setUser(user);
                dispatch(userAdded(user));
            })
        } else {
            res.json().then(error => {
                setUser("");
                console.log("/me error = ", error)
                // setUserFound(false)
            })
        }   
    })
  }, [dispatch])

  const chgUser = (cjf) => {
    setUser(cjf)
  }
  
  console.log('in App - user2 = ', user);

  // useEffect(() => {
  //   dispatch(fetchDealers())
  // })


  // if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <main>
      <NavBar chgUser={chgUser} user={user} />
        {user ? (
          <Routes>
            <Route exact="true" path="/" element={<Home user={user} />} />
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
            <Route exact="true" path="/" element={<Home />} />
            <Route path="/login" element={<LogIn chgUser={chgUser} />} />
            <Route path="/signup" element={<UserSignUpForm chgUser={chgUser} />} />
            <Route path="*" element={<Home />} />
          </Routes>  
        )} 
      </main>
    </>

  )
}

export default App;


