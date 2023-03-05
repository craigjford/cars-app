import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
  return fetch("/me")
    .then((response) => response.json())
    .then((user) => user);
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: [], // array of user
    status: "idle", // loading state
  },
  reducers: {
    userAdded(state, action) {
      console.log("adding user in slicer - action = ", action)
      state.entities.push(action.payload);
    },
    userRemoved(state, action) {
      // console.log("removing user - action = ", action)
      let bId = true;
      while (bId) {
          const idx = state.entities.findIndex((review) => review.restaurantId === action.payload);
          if (idx === -1) {
              bId = false
          } else {
              state.entities.splice(idx, 1);
          }
      } 
    },
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchUser.pending](state) {
      state.status = "loading";
    },
    [fetchUser.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { userAdded, userRemoved } = userSlice.actions;

export default userSlice.reducer;