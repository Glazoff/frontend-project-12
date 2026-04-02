import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import { ChatLayout } from '../../components/Chat';
import { initSocket } from '../../api/socket';
import { useChat } from '../../hooks/useChat.jsx';
import { useAuth } from '../../hooks/useAuth';
import { addChannel, removeChannel, renameChannel } from '../../store/channelsSlice';
import { addNewMessage, setConnectionStatus } from '../../store/messagesSlice';
import { CONNECTION_STATUS } from '../../constants';
import { useToastNotifications } from '../../components/ToastNotification';

export function Main() {
  const { token } = useAuth();
  const { fetchData } = useChat();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showToast } = useToastNotifications();
  const rollbar = useRollbar();
  const prevStatusRef = useRef(CONNECTION_STATUS.CONNECTED);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const socket = initSocket(token);

    socket.on('newMessage', (payload) => {
      dispatch(addNewMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    socket.on('disconnect', () => {
      dispatch(setConnectionStatus(CONNECTION_STATUS.DISCONNECTED));
      rollbar.warning('Socket disconnected');
      showToast.warning(t('chat.notifications.connectionLost'));
    });

    socket.on('connect', () => {
      dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
      if (prevStatusRef.current !== CONNECTION_STATUS.CONNECTED) {
        showToast.success(t('chat.notifications.connectionRestored'));
      }
      prevStatusRef.current = CONNECTION_STATUS.CONNECTED;
    });

    socket.on('reconnecting', () => {
      dispatch(setConnectionStatus(CONNECTION_STATUS.RECONNECTING));
      showToast.info(t('common.errors.reconnecting'));
    });

    socket.on('connect_error', (error) => {
      rollbar.error('Socket connection error', error);
      showToast.error(t('common.errors.networkError'));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('disconnect');
      socket.off('connect');
      socket.off('reconnecting');
      socket.off('connect_error');
    };
  }, [token, dispatch, t, showToast, rollbar]);

  return <ChatLayout />;
}
