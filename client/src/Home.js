import React from 'react';
import { useSelector } from "react-redux";

const Home = ({ isHome }) => {

  const user = useSelector((state) => state.user.entities);

  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) return <h1 className="App">Home Page - Please Login or Sign Up</h1>;

  return (
      <div>
        {isHome  ? (
          <>
            <h1 className="App">Welcome {user.first_name} {user.last_name} to Your Car Repository Home Page!</h1>
            <br />
            <h2 className="App">UserName: {user.username}</h2>
            <br />
            <hr />
            <br />
            <h4>The Car Repository application will allow a registered user to keep track of all of their cars. 
              The application will also allow a user to keep track of all the dealers from whom a user has 
              purchased a car.  Additionally the application allows a user to track all of the repairs performed
              on each car.  Welcome to the application and please <u>Sign Up or Login</u> to enjoy the application!!
            </h4>
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
