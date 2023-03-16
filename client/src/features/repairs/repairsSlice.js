import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRepairs = createAsyncThunk("repairs/fetchRepairs", () => {
  return fetch("/repairs")
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
    repairRemoved(state, action) {
      const idx = state.entities.findIndex((repair) => repair.id === action.payload.id);
      state.entities.splice(idx, 1)
    },
    // repairUpdated(state, action) {
    //   state.entities.map((repair) => {
    //       if (repair.id === action.payload.id) {
    //         return action.payload;
    //       } else {
    //         return repair;
    //       }
    //   })
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

export const { repairAdded,repairRemoved } = repairsSlice.actions;

export default repairsSlice.reducer;