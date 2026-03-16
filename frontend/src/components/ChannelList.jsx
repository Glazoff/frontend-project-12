import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export function ChannelList() {
  const { items: channels, loading, error } = useSelector((state) => state.channels);

  if (loading) {
    return <div className="text-center p-3">Загрузка каналов...</div>;
  }

  if (error) {
    return <div className="text-danger p-3">Ошибка: {error}</div>;
  }

  return (
    <ListGroup variant="flush">
      {channels.map((channel) => (
        <ListGroup.Item key={channel.id} action>
          {channel.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
