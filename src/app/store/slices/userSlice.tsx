import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; 
      state.error = null;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
