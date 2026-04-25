import { Button } from 'react-bootstrap'

export function AddChannelButton({ onClick }) {
  return (
    <Button variant="link" className="p-0 text-decoration-none" onClick={onClick}>
      +
    </Button>
  )
}
