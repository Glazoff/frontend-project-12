import { useRef, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

export function ChatMessageList({ messages, loading, error }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <div className="mt-2">Загрузка сообщений...</div>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Ошибка: {error}</Alert>;
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
      <div ref={messagesEndRef} />
    </ul>
  );
}
