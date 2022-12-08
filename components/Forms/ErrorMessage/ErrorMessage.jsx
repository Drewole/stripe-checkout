export default function ErrorMessage({ error, className }) {
  return error ? (
    <span className={className ? className : ''}>
      {error.message || 'Error'}
    </span>
  ) : null;
}
