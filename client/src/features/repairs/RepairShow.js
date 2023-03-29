import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function RepairShow() {
    const [errors, setErrors] = useState([]);
    const [callRequired, setCallRequired] = useState(true);
    const [repairData, setRepairData] = useState({
        id: "",
        car_id: "",
        shop_name: "",
        service_desc: "",
        car: {
            id: "",
            user_id: "",
            dealer_id: "",
            year: "",
            make: "",
            model: ""
        }
    });

    const loggedIn = useSelector((state) => state.user.loggedIn);

    const params = useParams();

    const repairId = parseInt(params.repair_id);

    const navigate = useNavigate();

    if (!loggedIn) {navigate('/')};

    const handleCancel = () => {
        // navigate(`/cars/${repairData.car.id}/edits`);
        navigate(-1);
    }

    if (callRequired) {
        setCallRequired(false);
        fetch (`/repairs/${repairId}`, {
        })  
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setRepairData(data)
                }) 
            } else {
                res.json().then(err => setErrors(err.error))
            }
        })
    }

  return (
        <div>  
            <h3><u>Car Repair For</u></h3>
            <h3>{repairData.car.year}  {repairData.car.make}  {repairData.car.model}</h3>  
            <br />
            <hr />
            <br />
            <h3>Shop Name: {repairData.shop_name}</h3>
            <h3>Cost: {repairData.cost}</h3>
            <h3>Service Description: {repairData.service_desc}</h3>
            <br />
            <br />
            <button type="button" className="submit-btn" onClick={handleCancel}>Back</button>
            <br />
            <br />
            {errors ? errors.map(e => <li style={{color:'red'}} key={e}>{e}</li>) : ""}
        </div>
  )
}

export default RepairShow;