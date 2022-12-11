export default function ErrorMessage({ error, className }) {
  return error ? (
    <span role="alert" className={className ? className : ''}>
      {error.message || 'Error'}
    </span>
  ) : null;
}
