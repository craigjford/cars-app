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
      state.entities.push(action.payload);
    },
    userRemoved(state, action) {
      console.log("action = ", action)
      let index = state.entities.findIndex((user) => user.id === action.payload);
      state.entities.splice(index, 1);
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