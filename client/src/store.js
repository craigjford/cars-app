import { configureStore } from "@reduxjs/toolkit";

import dealersReducer from "./features/dealers/dealersSlice";
import mydealersReducer from "./features/mydealers/mydealersSlice";
import userReducer from "./features/user/userSlice";
import carsReducer from "./features/cars/carsSlice";
import repairsReducer from "./features/repairs/repairsSlice";

const store = configureStore({
  reducer: {
    dealers: dealersReducer,
    mydealers: mydealersReducer,
    user: userReducer,
    cars: carsReducer,
    repairs: repairsReducer
  },
});

export default store;