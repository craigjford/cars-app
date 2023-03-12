import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("cars/fetchCars", () => {
  return fetch("/mycars")
    .then((response) => response.json())
    .then((cars) => cars);
});

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    entities: [], // array of cars
    status: "idle", // loading state
  },
  reducers: {
    carAdded(state, action) {
      state.entities.push(action.payload);
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
    // repairUpdated(state, action) {
    //   const repair = state.entities.find((repair) => repair.id === action.payload.id);
    //   repair.url = action.payload.url;
    // },
    carReset(state) {
      state.entities.length = 0;
      state.status = "idle";
      state.loggedIn = false;
    },
    // repairAdded(state, action) {
    //   const idx = state.entities.findIndex(action.payload.id);
      
    // },
    // carUpdated(state, action) {
    //   const car = state.entities.find((car) => car.id === action.payload.id);
    //   car.url = action.payload.url;
    // },
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

export const { carAdded, carRepairAdded, carRepairRemoved, carRepairUpdated, carReset } = carsSlice.actions;

export default carsSlice.reducer;
