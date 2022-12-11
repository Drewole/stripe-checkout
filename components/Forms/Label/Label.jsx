export default function Label({ children, value, htmlFor }) {
  return value ? (
    <label htmlFor={htmlFor} className={'label'}>
      <span>{value}</span>
      {children}
    </label>
  ) : null;
}
