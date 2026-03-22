import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendMessage as sendMessageApi, getMessages } from '../api/messages';
import { setChannels, setLoading as setChannelsLoading, setError as setChannelsError } from '../store/channelsSlice';
import { setMessages, setLoading as setMessagesLoading, setError as setMessagesError } from '../store/messagesSlice';
import { getChannels } from '../api/channels';

export function useChat() {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);

  const fetchData = async () => {
    dispatch(setChannelsLoading(true));
    dispatch(setMessagesLoading(true));
    try {
      const [channelsData, messagesData] = await Promise.all([
        getChannels(),
        getMessages(),
      ]);
      dispatch(setChannels(channelsData));
      dispatch(setMessages(messagesData));
    } catch (err) {
      dispatch(setChannelsError(err.message));
      dispatch(setMessagesError(err.message));
    } finally {
      dispatch(setChannelsLoading(false));
      dispatch(setMessagesLoading(false));
    }
  };

  const sendMessage = async (messageData) => {
    if (isSending) return false;

    setIsSending(true);
    try {
      await sendMessageApi(messageData);
      return true;
    } catch (err) {
      console.error('Failed to send message:', err);
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return {
    fetchData,
    sendMessage,
    isSending,
  };
}
