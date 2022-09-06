import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data.sort((a, b) => a.title.localeCompare(b.title));
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle", // 'idle' | 'loading' | 'succeded' | 'failed'
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPost = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;
export const getErrorMessage = (state) => state.posts.error;
export const selectPostByUserId = (state, userId) =>
  state.posts.posts.filter((post) => post.userId === userId);

export default postsSlice.reducer;
