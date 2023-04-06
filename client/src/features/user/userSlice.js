import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
  return fetch("/users")
    .then((response) => response.json())
    .then((user) => user);
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: {}, 
    status: "idle", 
    loggedIn: false
  },
  reducers: {
    userAdded(state, action) {
      state.entities = action.payload
      // state.entities.push(action.payload);
      state.loggedIn = true;
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