import { createSlice } from '@reduxjs/toolkit';

import { GENERAL_CHANNEL_ID } from '../constants';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    currentChannelId: GENERAL_CHANNEL_ID, // General channel по умолчанию
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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      if (state.currentChannelId === action.payload.id) {
        state.currentChannelId = GENERAL_CHANNEL_ID;
      }
    });
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
