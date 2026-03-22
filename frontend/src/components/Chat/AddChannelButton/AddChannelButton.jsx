import { Button } from 'react-bootstrap';

export function AddChannelButton({ onClick }) {
  return (
    <Button variant="link" className="p-0 text-decoration-none" onClick={onClick}>
      <img src="/plus.svg" alt="Добавить канал" width="20" height="20" />
    </Button>
  );
}
