import { configureStore } from '@reduxjs/toolkit';
import reduxCounterReducer from './reduxCounterSlice';
import usersReducer from './usersSlice';
import postsReducer from './postsSlice'

// Здесь передаем rootReducer
// const store = configureStore({
//   reducer: rootReducer,
// });


//Здесь передаем несколько sliceReducer
//configureStore сам вызывает combineReducers
export default configureStore({
  reducer: {
    reduxCounter: reduxCounterReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
