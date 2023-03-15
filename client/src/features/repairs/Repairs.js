import React from 'react';
import { useSelector } from "react-redux";

function Repairs() {
    const repairs = useSelector((state) => state.repairs.entities);

    console.log('repairs = ', repairs);

  return (
    <div>
        MyRepairs Page
    </div>
  )
}

export default Repairs;