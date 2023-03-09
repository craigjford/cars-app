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
    mydealerReset(state) {
      state.entities.length = 0;
      state.status = "idle";
      state.loggedIn = false;
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

export const { mydealerAdded, mydealerReset } = mydealersSlice.actions;

export default mydealersSlice.reducer;