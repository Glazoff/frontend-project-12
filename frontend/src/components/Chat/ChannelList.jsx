import { ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentChannelId } from '../../store/channelsSlice';

export function ChannelList() {
  const dispatch = useDispatch();
  const { items: channels, loading, error, currentChannelId } = useSelector((state) => state.channels);

  const handleSelectChannel = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger p-3">Ошибка: {error}</div>;
  }

  return (
    <ListGroup variant="flush">
      {channels.map((channel) => (
        <ListGroup.Item
          key={channel.id}
          action
          active={channel.id === currentChannelId}
          onClick={() => handleSelectChannel(channel.id)}
        >
          {channel.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
