import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDealers = createAsyncThunk("dealers/fetchDealers", () => {
  return fetch("/dealers")
    .then((response) => response.json())
    .then((dealers) => dealers);
});

const dealersSlice = createSlice({
  name: "dealers",
  initialState: {
    entities: [], // array of dealers
    status: "idle", // loading state
  },
  reducers: {
    dealerAdded(state, action) {
      // using createSlice lets us mutate state!
      state.entities.push(action.payload);
    },
    // dealerUpdated(state, action) {
    //   const dealer = state.entities.find((dealer) => dealer.id === action.payload.id);
    //   dealer.url = action.payload.url;
    // },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchDealers.pending](state) {
      state.status = "loading";
    },
    [fetchDealers.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { dealerAdded } = dealersSlice.actions;

export default dealersSlice.reducer;
