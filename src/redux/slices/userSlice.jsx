import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userStats: {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  },
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserStats: (state, action) => {
      state.userStats = action.payload;
    },
  },
});

export const { setUser, updateUserStats } = userSlice.actions;
export default userSlice.reducer;
