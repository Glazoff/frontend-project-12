import { useEffect, useState } from 'react';

import { getChannels } from '../../api/channels';
import { getMessages } from '../../api/messages';

export function Main() {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelsData, messagesData] = await Promise.all([
          getChannels(),
          getMessages(),
        ]);
        setChannels(channelsData);
        setMessages(messagesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <h2>Channels</h2>
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.username}</strong>: {message.body} (Channel: {message.channelId})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
