import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addPosts = createAsyncThunk(
  "posts/addPosts",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      console.log(response);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

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
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        action.payload.id = state.posts[state.posts.length - 1].id + 1;
        state.posts.push(action.payload);
        state.status = "succeded";
      })
      .addCase(addPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPost = (state) => state.posts.posts;
export const getStatus = (state) => state.posts.status;
export const getErrorMessage = (state) => state.posts.error;

export default postsSlice.reducer;
