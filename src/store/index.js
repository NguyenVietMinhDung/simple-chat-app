import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../slides/comment';

export default configureStore({
  reducer: {
    comments: commentsReducer,
  },
});
