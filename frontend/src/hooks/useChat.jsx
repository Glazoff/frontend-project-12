import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { sendMessage as sendMessageApi, getMessages } from '../api/messages';
import { setChannels, setLoading as setChannelsLoading, setError as setChannelsError } from '../store/channelsSlice';
import { setMessages, setLoading as setMessagesLoading, setError as setMessagesError } from '../store/messagesSlice';
import { getChannels } from '../api/channels';
import { useToastNotifications } from '../components/ToastNotification';

export function useChat() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showToast } = useToastNotifications();
  const [isSending, setIsSending] = useState(false);

  const loadChannels = async () => {
    dispatch(setChannelsLoading(true));
    try {
      const channelsData = await getChannels();
      dispatch(setChannels(channelsData));
    } catch (err) {
      dispatch(setChannelsError(err.message));
      showToast.error(t('chat.notifications.channelsLoadError'));
    } finally {
      dispatch(setChannelsLoading(false));
    }
  };

  const loadMessages = async () => {
    dispatch(setMessagesLoading(true));
    try {
      const messagesData = await getMessages();
      dispatch(setMessages(messagesData));
    } catch (err) {
      dispatch(setMessagesError(err.message));
      showToast.error(t('chat.notifications.messagesLoadError'));
    } finally {
      dispatch(setMessagesLoading(false));
    }
  };

  const fetchData = async () => {
    await Promise.all([loadChannels(), loadMessages()]);
  };

  const sendMessage = async (messageData) => {
    if (isSending) return false;

    setIsSending(true);
    try {
      await sendMessageApi(messageData);
      return true;
    } catch (err) {
      console.error('Failed to send message:', err);
      showToast.error(t('chat.notifications.messageSendError'));
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return {
    fetchData,
    loadChannels,
    loadMessages,
    sendMessage,
    isSending,
  };
}
