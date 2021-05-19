import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.users = action.payload;
      }
    },
    usersError(state, action) {
      state.loading = 'idle';
      state.error = action.payload;
    },
  },
});

// Destructure and export the plain action creators
const { usersLoading, usersReceived, usersError } = usersSlice.actions;

// Define a thunk that dispatches those action creators
export const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading());
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    dispatch(usersReceived(users));
  } catch (err) {
    dispatch(usersError(err));
  }
};

export default usersSlice.reducer
