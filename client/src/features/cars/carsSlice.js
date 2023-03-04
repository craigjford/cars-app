import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("cars/fetchCars", () => {
  return fetch("/cars")
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
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
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

export const { carAdded } = carsSlice.actions;

export default carsSlice.reducer;