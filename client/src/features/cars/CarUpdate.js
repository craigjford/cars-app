import React, { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useNavigate,  useParams } from "react-router-dom";
import { carUpdated } from "./carsSlice";
import { repairCarUpdated } from "../repairs/repairsSlice";
import { mydealerCarUpdated } from "../mydealers/mydealersSlice";

function CarUpdate() {
    const [initializeState, setInitializeState] = useState(true);
    const [errors, setErrors] = useState([]);
    const [dealerId, setDealerId] = useState("");
    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector((state) => state.user.loggedIn);
    const dealers = useSelector((state) => state.dealers.entities);
    const userArr = useSelector((state) => state.user.entities);
    const user = userArr[0];

    const carsArr = useSelector((state) => state.cars.entities);
    const carArr = carsArr.filter((car) => car.id === parseInt(params.car_id));
    const car = carArr[0];
    console.log('in CarUpdate - car = ', car);  

    if (initializeState) {
        setInitializeState(false)
        setDealerId(parseInt(car.dealer_id));
        setYear(car.year);
        setMake(car.make);
        setModel(car.model);
    } 
  
    if (!loggedIn) {navigate('/')};

    const dealerList = dealers.map((dealer) => (
        <option key={dealer.id} value={dealer.id}>{dealer.name}</option>
    ))

    const handleCancel = () => {
        navigate(-1);
    }

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        fetch (`/cars/${parseInt(params.car_id)}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            dealer_id: dealerId,
            year: year,
            make: make,
            model: model
          })
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    dispatch(carUpdated(data))
                    const carObj = {id: data.id, user_id: data.user_id, dealer_id: data.dealer_id, year: 
                        data.year, make: data.make, model: data.model}   
                    dispatch(repairCarUpdated(carObj))
                    const myDealerObj =({id: data.dealer.id, name:data.dealer.name, contact: data.dealer.contact, phone: data.dealer.phone, 
                        email: data.dealer.email, car: {id: data.id, user_id: data.user_id, dealer_id: data.dealer_id,
                        year: data.year, make: data.make, model: data.model}})
                    debugger    
                    dispatch(mydealerCarUpdated(myDealerObj))    
                    navigate(-1);
                }) 
            } else {
                res.json().then(err => setErrors(err.errors))
            }
        })
    }

  return (
        <div className="App">    
            <form onSubmit={handleSubmit}>
                <label>Dealer: </label>
                <select id="dealers" name="dealer_id" value={dealerId} onChange={(e) => setDealerId(parseInt(e.target.value))}>
                    {dealerList}
                </select>    
                <br />
                <label>Year: </label>
                <input type="text" id="year" name="year" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
                <br />
                <label>Make: </label>
                <input type="text" id="make" name="make" value={make} onChange={(e) => setMake(e.target.value)} />
                <br />
                <label>Model: </label>
                <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} />
                <br />
                <br />
                <br />
                <br />
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="submit-btn" onClick={handleCancel}>Cancel</button>
            </form>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default CarUpdate;