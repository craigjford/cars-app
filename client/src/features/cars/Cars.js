import React from 'react';
import Car from "./Car";
// import CarInput from "./CarInput";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import { fetchCars } from "./carsSlice";

function Cars() {
  // const [addingCar, setAddingCar] = useState(false);

// cars with dealers, repairs

  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  if (!loggedIn) {navigate('/')};

  // const dispatch = useDispatch();
    
  // useEffect(() => {
  //   dispatch(fetchCars())
  // })

  const cars = useSelector((state) => state.cars.entities);
  const status = useSelector((state) => state.cars.status);

  console.log('Cars - cars = ', cars);
  console.log('Cars - status = ', status);


  // if (status === "loading") {<h1>Loading....</h1>};

  // const handleClick = () => {
  //   setAddingCar(true);
  // }

  return (
    <div className="App">
      <h1>My Cars</h1>
        {cars.map((car) => <Car key={car.id} car={car}/>)}
      {/* <br />
      {addingCar ? null : <button type="button" onClick={handleClick}>Add Car</button>}
      <br />
      <br />
      <br />
      {addingCar ? <CarInput setAddingCar={setAddingCar} /> : null} */}
    </div>
  )
}

export default Cars;