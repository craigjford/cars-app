import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDealers = createAsyncThunk("dealers/fetchDealers", () => {
  // return a Promise containing the data we want
  return fetch("/dealers")
    .then((response) => response.json())
    .then((data) => console.log("dealers in fetch = ", data));
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
    // catUpdated(state, action) {
    //   const cat = state.entities.find((cat) => cat.id === action.payload.id);
    //   cat.url = action.payload.url;
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
