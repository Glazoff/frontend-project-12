import { useSelector } from 'react-redux';

export function ChatMessages() {
  const { items: messages, loading, error } = useSelector((state) => state.messages);

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

  if (messages.length === 0) {
    return <div className="text-center text-muted">Сообщений пока нет</div>;
  }

  return (
    <ul className="list-unstyled mb-0">
      {messages.map((message) => (
        <li key={message.id} className="mb-2">
          <strong>{message.username}</strong>
          <span className="text-muted ms-2">
            [{new Date(message.createdAt).toLocaleTimeString()}]
          </span>
          <div>{message.body}</div>
        </li>
      ))}
    </ul>
  );
}
