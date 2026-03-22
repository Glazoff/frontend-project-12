import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
});

export default store;
