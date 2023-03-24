import React from 'react';
import { useSelector } from "react-redux";


const Home = ({ isHome }) => {

  const userArr = useSelector((state) => state.user.entities);
  const user = userArr[0];
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) return <h1>Home Page - Please Login or Sign Up</h1>;

  return (
      <div>
        {isHome  ? (
          <>
            <h1>Welcome {user.first_name} {user.last_name} to Your Home Page!</h1>
            <br />
            <br />
            <h2>UserName: {user.username}</h2>
          </>
    ) : (
          <>
            <h1>404 - Page Not Found</h1>
            <img src="https://bashooka.com/wp-content/uploads/2012/06/404-error-page-template-1.jpg" alt="Not Found" />
          </>
    )}      
      </div>
    ) 

}

export default Home;
