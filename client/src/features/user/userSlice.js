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
    loggedIn: false
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
      state.loggedIn = true;
    },
    userRemoved(state, action) {
      console.log("in user Splicer removing user - action = ", action)
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
    userReset(state) {
      state.entities.length = 0;
      state.status = "idle";
      state.loggedIn = false;
    }
  },
  extraReducers: {
    // handle async actions: pending, fulfilled, rejected (for errors)
    [fetchUser.pending](state) {
      state.status = "loading";
      state.loggedIn = false;
    },
    [fetchUser.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { userAdded, userRemoved, userReset } = userSlice.actions;

export default userSlice.reducer;