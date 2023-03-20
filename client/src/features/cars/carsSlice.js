import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("cars/fetchCars", () => {
  return fetch("/mycars")
    .then((response) => response.json())
    .then((cars) => cars);
});

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    entities: [], 
    status: "idle", // loading state
  },
  reducers: {
    carAdded(state, action) {
      state.entities.push(action.payload);
    },
    carRemoved(state, action) {
      const idx = state.entities.findIndex((car) => car.id === action.payload.id);
      state.entities.splice(idx, 1);
    },
    carUpdated(state, action) {
      const idx = state.entities.findIndex((car) => car.id === action.payload.id);
      state.entities[idx] = action.payload;
    },
    carRepairAdded(state, action) {
      const car = state.entities.find((car) => car.id === action.payload.car_id);
      car.repairs.push(action.payload);
    },
    carRepairRemoved(state, action) {
      const car = state.entities.find((car) => car.id === action.payload.car_id);
      const idx = car.repairs.findIndex((repair) => repair.id === action.payload.id);
      car.repairs.splice(idx, 1)
    },
    carRepairUpdated(state, action) {
      const car = state.entities.find((car) => car.id === action.payload.car_id);
      const repairArr = car.repairs.map((repair) => {
          if (repair.id === action.payload.id) {
            return action.payload;
          } else {
            return repair;
          }
      })
      car.repairs = repairArr;
    },
    carReset(state) {
      state.entities.length = 0;
      state.status = "idle";
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchCars.pending](state) {
      state.status = "loading";
    },
    [fetchCars.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { carAdded, carRemoved, carUpdated, carRepairAdded, carRepairRemoved, carRepairUpdated, carReset } = carsSlice.actions;

export default carsSlice.reducer;
