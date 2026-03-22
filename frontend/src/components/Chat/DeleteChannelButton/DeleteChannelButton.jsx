export function DeleteChannelButton({ onClick }) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e);
        }
      }}
      style={{
        opacity: 0,
        transition: 'opacity 0.2s',
        cursor: 'pointer',
        color: '#dc3545',
        fontSize: '0.875rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = 0;
      }}
    >
      Delete
    </span>
  );
}
