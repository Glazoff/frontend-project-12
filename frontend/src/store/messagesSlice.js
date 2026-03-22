import { createSlice } from '@reduxjs/toolkit';

import { CONNECTION_STATUS } from '../constants';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    loading: false,
    error: null,
    connectionStatus: CONNECTION_STATUS.CONNECTED,
  },
  reducers: {
    setMessages: (state, action) => {
      state.items = action.payload;
    },
    addMessage: (state, action) => {
      state.items.push(action.payload);
    },
    addNewMessage: (state, action) => {
      // Avoid duplicates when receiving from socket
      const exists = state.items.some((msg) => msg.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeMessage: (state, action) => {
      state.items = state.items.filter((msg) => msg.id !== action.payload.id);
    },
    removeMessagesByChannelId: (state, action) => {
      state.items = state.items.filter((msg) => msg.channelId !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  addNewMessage,
  removeMessage,
  removeMessagesByChannelId,
  setLoading,
  setError,
  setConnectionStatus,
} = messagesSlice.actions;
export default messagesSlice.reducer;
