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
    repairUpdated(state, action) {
      const updtArr = state.entities.map((repair) => {
          if (repair.id === action.payload.id) {
            return action.payload;
          } else {
            return repair;
          }
      })
      state.entities = updtArr;
    },
    repairCarRemoved(state, action) {
      const repairArr = state.entities.filter((repair) => repair.car_id !== action.payload.id);
      state.entities = repairArr;
    },
    repairCarUpdated(state, action) {
      debugger
      const repairArr = state.entities.map((repair) => {
          if (repair.car_id === action.payload.id) {
            repair = {...repair, car: action.payload}
            return repair
          } else {
            return repair;
          }
      })
      state.entities = repairArr;
    },
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

export const { repairAdded, repairRemoved, repairUpdated, repairCarRemoved, repairCarUpdated } = repairsSlice.actions;

export default repairsSlice.reducer;