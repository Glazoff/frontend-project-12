import { useSelector } from 'react-redux';

export function ChatMessages() {
  const { items: messages, loading, error } = useSelector((state) => state.messages);
  const { currentChannelId } = useSelector((state) => state.channels);

  // Фильтрация сообщений по текущему каналу
  const channelMessages = messages.filter((msg) => msg.channelId === currentChannelId);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <div className="mt-2">Загрузка сообщений...</div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Ошибка: {error}</div>;
  }

  if (channelMessages.length === 0) {
    return <div className="text-center text-muted">Сообщений пока нет</div>;
  }

  return (
    <ul className="list-unstyled mb-0">
      {channelMessages.map((message) => (
        <li key={message.id} className="mb-2">
          <strong>{message.username}:</strong> {message.body}
        </li>
      ))}
    </ul>
  );
}
