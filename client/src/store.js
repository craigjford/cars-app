import { configureStore } from "@reduxjs/toolkit";

import dealersReducer from "./features/dealers/dealersSlice";
import usersReducer from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    dealers: dealersReducer,
    users: usersReducer,
  },
});

export default store;