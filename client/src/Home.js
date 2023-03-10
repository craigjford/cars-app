import React from 'react';
import { useSelector } from "react-redux";

const Home = () => {

  const userArr = useSelector((state) => state.user.entities);
  const user = userArr[0];
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) return <h1>Home Page - Please Login or Sign Up</h1>;

  return (
    <div>
        <h1>Welcome {user.first_name} {user.last_name} to Your Home Page!</h1>
        <br />
        <br />
        <h2>UserName: {user.username}</h2>
    </div>
  )
}

export default Home;
