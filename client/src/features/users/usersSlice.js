import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  return fetch("/users")
    .then((response) => response.json())
    .then((users) => users);
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [], // array of users
    status: "idle", // loading state
  },
  reducers: {
    userAdded(state, action) {
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
    [fetchUsers.pending](state) {
      state.status = "loading";
    },
    [fetchUsers.fulfilled](state, action) {
      state.entities = action.payload;
      state.status = "idle";
    },
  },
});

export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer;