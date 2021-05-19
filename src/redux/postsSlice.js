import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchPostById = createAsyncThunk(
  'posts/fetchByIdStatus',
  async (postId, thunkAPI) => {
    // interface ThunkAPI {
    //   dispatch: Function
    //   getState: Function
    //   extra?: any
    //   requestId: string
    //   signal: AbortSignal
    // }
    console.log(thunkAPI) //dispatch, getState

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const post = await response.json();
    return post
  }
)

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
    const posts = await response.json();
    return posts;
  }
)

export const postsAdapter = createEntityAdapter()

// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = postsAdapter.getInitialState({loading: 'idle'})

// Then, handle actions in your reducers:
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    removePost: postsAdapter.removeOne,
  },
  //extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    //[fetchPostById.fulfilled]: (state, action) => {
      // Add post to the state array
      //state.entities.push(action.payload)
    //},
  //},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, postsAdapter.upsertMany)
    builder.addCase(fetchPostById.fulfilled, (state, { payload }) => {
      //const { id, ...changes } = payload
      postsAdapter.addOne(state, payload)
    })
  }
})

export default postsSlice.reducer