import { combineReducers } from "redux";
import dealersReducer from "./features/dealers/dealersSlice";

const rootReducer = combineReducers({
  cats: dealersReducer,
});

export default rootReducer;
