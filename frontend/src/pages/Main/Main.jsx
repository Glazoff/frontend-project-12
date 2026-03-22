import { useEffect } from 'react';

import { ChatLayout } from '../../components/Chat';
import { useSocket } from '../../hooks/useSocket';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';

export function Main() {
  const { token } = useAuth();
  const { fetchData } = useChat();
  useSocket(token);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatLayout />;
}
