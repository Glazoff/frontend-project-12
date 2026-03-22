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
    addChannel: (state, action) => {
      state.items.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.items = state.items.filter((channel) => channel.id !== action.payload.id);
    },
    renameChannel: (state, action) => {
      const channel = state.items.find((ch) => ch.id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChannels,
  addChannel,
  removeChannel,
  renameChannel,
  setLoading,
  setError,
} = channelsSlice.actions;
export default channelsSlice.reducer;
