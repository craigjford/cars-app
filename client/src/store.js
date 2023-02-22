import { configureStore } from "@reduxjs/toolkit";

import dealersReducer from "./features/dealers/dealersSlice";

const store = configureStore({
  reducer: {
    dealers: dealersReducer,
  },
});

export default store;