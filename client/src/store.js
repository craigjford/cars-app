import { configureStore } from "@reduxjs/toolkit";

import dealersReducer from "./features/dealers/dealersSlice";
import userReducer from "./features/user/userSlice";
import carsReducer from "./features/cars/carsSlice";

const store = configureStore({
  reducer: {
    dealers: dealersReducer,
    user: userReducer,
    cars: carsReducer
  },
});

export default store;