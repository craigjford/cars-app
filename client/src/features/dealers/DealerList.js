import React, { useState } from 'react';

// function DealerList({ dealer }) {
//     const [addDealer, setAddDealer] = (false);
//     const [formData, setFormData] = useState({
//         name: "",
//         contact: "",
//         phone: "",
//         email: ""
//     })

//     const handleClick = (e) => {
//         setAddDealer(true);
//       } 

//     const handleChange = (e) => {
//         setFormData([e.target.id], e.target.value)
//     } 

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setAddDealer(false);
//     }

//   return (
//     <div>
//         <h3>Name: {dealer.name}</h3>
//         <h3>Contact: {dealer.contact}</h3>
//         <h3>Phone: {dealer.phone}</h3>
//         <h3>Email: {dealer.email}</h3>
//         <button onClick={handleClick}>Add Dealer</button>
//         {addDealer ? return {
//         <>    
//             <form onSubmit={handleSubmit}>
//                 <label>Name:</label>
//                 <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
//                 <label>Name:</label>
//                 <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} />
//                 <label>Name:</label>
//                 <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
//                 <label>Name:</label>
//                 <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
//                 <br />
//                 <button type="submit">Submit</button>
//             </form>
//         </>
//         } : null}
//         <hr />
//     </div>
//   )
// }

export default DealerList;

