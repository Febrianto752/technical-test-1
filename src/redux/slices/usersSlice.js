import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectAllUser = (state) => state.users.users;

export default usersSlice.reducer;
