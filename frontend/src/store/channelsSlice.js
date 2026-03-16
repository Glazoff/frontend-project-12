import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setChannels: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setChannels, setLoading, setError } = channelsSlice.actions;
export default channelsSlice.reducer;
