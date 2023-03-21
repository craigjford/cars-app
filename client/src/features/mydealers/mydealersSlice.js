import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchmyDealers = createAsyncThunk("mydealers/fetchmyDealers", () => {
  return fetch("/mydealers")
    .then((response) => response.json())
    .then((mydealers) => mydealers);
});

const mydealersSlice = createSlice({
  name: "mydealers",
  initialState: {
    entities: [], // array of dealers
    status: "idle", // loading state
  },
  reducers: {
    mydealerAdded(state, action) {
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
    mydealerCarAdded(state, action) {
      const idx = state.entities.findIndex((dealer) => dealer.id === action.payload.id);
      if (idx === -1) {
          state.entities.push(action.payload) 
      } else {
          state.entities[idx].cars.push(action.payload.car)
      }
    },
    mydealerCarRemoved(state, action) {
      const dealerIdx = state.entities.findIndex((dealer) => dealer.id === action.payload.dealer_id);
      const carIdx = state.entities[dealerIdx].cars.findIndex((car) => car.id === action.payload.id);
      if (carIdx > -1 && state.entities[dealerIdx].cars.length === 1) {
        state.entities.splice(dealerIdx, 1);
      } else {
        state.entities[dealerIdx].cars.splice(carIdx, 1); 
      }
    },
    mydealerCarUpdated(state, action) {
      debugger
      let carNotFound = true;
      let ctr = 0;
      while (carNotFound) {
        const carIdx = state.entities[ctr].cars.findIndex((car) => car.id === action.payload.car.id);
        if (carIdx > -1) {
            debugger
            carNotFound = false
        }
      }
      state.entities[ctr] = action.payload;
      // const dealerIdx = state.entities.findIndex((dealer) => dealer.id === action.payload.dealer_id);
      // const carIdx = state.entities[dealerIdx].cars.findIndex((car) => car.id === action.payload.id);
      // if (carIdx > -1 && state.entities[dealerIdx].cars.length === 1) {
      //   state.entities.splice(dealerIdx, 1);
      // } else {
      //   state.entities[dealerIdx].cars.splice(carIdx, 1); 
      // }
    },
    mydealerReset(state) {
      state.entities.length = 0;
      state.status = "idle";
    },
    // mydealerUpdated(state, action) {
    //   const mydealer = state.entities.find((mydealer) => mydealer.id === action.payload.id);
    //   dealer.url = action.payload.url;
    // },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchmyDealers.pending](state) {
      state.status = "loading";
    },
    [fetchmyDealers.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { mydealerAdded, mydealerReset, mydealerCarAdded, mydealerCarRemoved, mydealerCarUpdated } = mydealersSlice.actions;

export default mydealersSlice.reducer;