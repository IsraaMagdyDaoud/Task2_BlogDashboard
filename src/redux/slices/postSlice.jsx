import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createPost,
  deletePost,
  updatePost,
} from "../thunks/postThunks";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex] = action.payload;
        }
        state.status = "succeeded";
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
