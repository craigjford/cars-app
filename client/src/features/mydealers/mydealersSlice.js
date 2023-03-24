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
    mydealerInitialized(state, action) {
      let ctr = 0;
      let arrLength = state.entities.length;
      while (ctr < arrLength) {
        let carArr = [];
         carArr = state.entities[ctr].cars.filter((car) => car.user_id === action.payload)
         state.entities[ctr].cars = carArr;
        ctr = ctr + 1;
      }
    },
    mydealerAdded(state, action) {
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
      const newdealerId = action.payload.id;
      let oldDealerId = 0;
      let carNotFound = true;
      let ctr = 0;
      let ctrHold = 0;
      let carIdxHold = 0

      // code finds where the car is in the array now
      while (carNotFound) {
        const carIdx = state.entities[ctr].cars.findIndex((car) => car.id === action.payload.car.id);
        if (carIdx > -1) {
            carNotFound = false;
            oldDealerId = state.entities[ctr].id;
            ctrHold = ctr;
            carIdxHold = carIdx;
        } 
        ctr = ctr + 1
      }
      debugger
      //if dealer did not change - just change new car object from old
      console.log('newdealerId = ', newdealerId);
      console.log('olddealerId = ', oldDealerId);
      if (newdealerId === oldDealerId) {
          const carIdx = state.entities[ctrHold].cars.findIndex((car) => car.id === action.payload.car.id); 
          state.entities[ctrHold].cars[carIdx] = action.payload.car;
      } else {
          // checks to see if current dealer is aleady in array
          // if it does, just add car to array of cars... if old dealer has no cars, remove dealer
          const dealerIdx = state.entities.findIndex((dealer) => dealer.id === newdealerId);
          if (dealerIdx > -1) {
              state.entities[dealerIdx].cars.push(action.payload.car);
              state.entities[ctrHold].cars.splice(carIdxHold, 1);
          } else {
              //if it does not insert entire action.payload and remove from old dealers car arrray
              state.entities.push(action.payload);
              state.entities[ctrHold].cars.splice(carIdxHold, 1);
          }
            if (state.entities[ctrHold].cars.length === 0) {
              state.entities.splice((ctrHold), 1)
            }
      }


    },
    mydealerReset(state) {
      state.entities.length = 0;
      state.status = "idle";
    },
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

export const { mydealerInitialized, mydealerAdded, mydealerReset, mydealerCarAdded, mydealerCarRemoved, mydealerCarUpdated } = mydealersSlice.actions;

export default mydealersSlice.reducer;