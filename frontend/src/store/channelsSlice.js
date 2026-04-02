import { createSlice } from '@reduxjs/toolkit';

import { GENERAL_CHANNEL_ID } from '../constants';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: GENERAL_CHANNEL_ID,
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
      const removedChannelId = action.payload.id;
      state.items = state.items.filter((channel) => channel.id !== removedChannelId);
      if (state.currentChannelId === removedChannelId) {
        state.currentChannelId = GENERAL_CHANNEL_ID;
      }
    },
    renameChannel: (state, action) => {
      const channel = state.items.find((ch) => ch.id === action.payload.id);
      if (channel) {
        channel.name = action.payload.name;
      }
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
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
  setCurrentChannelId,
  setLoading,
  setError,
} = channelsSlice.actions;
export default channelsSlice.reducer;
