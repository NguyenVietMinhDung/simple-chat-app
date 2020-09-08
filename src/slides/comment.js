import { createSlice } from '@reduxjs/toolkit';

export const comment = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    getComments: (state, action) => {
      const { comments } = action.payload;
      state.push(...comments);
    },
    addComment: (state, action) => {
      const { _id, name, message } = action.payload;
      state.push({ _id, name, message });
    },
  },
});

export const { getComments, addComment } = comment.actions;

export const selectComments = (state) => state.comments;

export default comment.reducer;
