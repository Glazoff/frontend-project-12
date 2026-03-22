import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ChatLayout } from '../../components/Chat';
import { initSocket } from '../../api/socket';
import { useChat } from '../../hooks/useChat.jsx';
import { useAuth } from '../../hooks/useAuth';
import { addChannel, removeChannel, renameChannel } from '../../store/channelsSlice';
import { addNewMessage, setConnectionStatus, CONNECTION_STATUS } from '../../store/messagesSlice';

export function Main() {
  const { token } = useAuth();
  const { fetchData } = useChat();
  const dispatch = useDispatch();

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
    });

    socket.on('connect', () => {
      dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));
    });

    socket.on('reconnecting', () => {
      dispatch(setConnectionStatus(CONNECTION_STATUS.RECONNECTING));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('disconnect');
      socket.off('connect');
      socket.off('reconnecting');
    };
  }, [token, dispatch]);

  return <ChatLayout />;
}
