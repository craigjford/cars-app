import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRepairs = createAsyncThunk("repairs/fetchRepairs", () => {
  return fetch("/myrepairs")
    .then((response) => response.json())
    .then((repairs) => repairs);
});

const repairsSlice = createSlice({
  name: "repairs",
  initialState: {
    entities: [], 
    status: "idle", 
  },
  reducers: {
    repairAdded(state, action) {
      state.entities.push(action.payload);
    },
    // repairUpdated(state, action) {
    //   const repair = state.entities.find((repair) => repair.id === action.payload.id);
    //   repair.url = action.payload.url;
    // },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchRepairs.pending](state) {
      state.status = "loading";
    },
    [fetchRepairs.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { repairAdded } = repairsSlice.actions;

export default repairsSlice.reducer;