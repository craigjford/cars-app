import React from 'react';

function Dealer({ dealer }) {

  return (
    <div>
        <h3>Name: {dealer.name}</h3>
        <h3>Contact: {dealer.contact}</h3>
        <h3>Phone: {dealer.phone}</h3>
        <h3>Email: {dealer.email}</h3>
        <hr />
     </div>
   )
 }

export default Dealer;



