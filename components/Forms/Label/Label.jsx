export default function Label({ children, value, htmlFor }) {
  return value ? (
    <label htmlFor={htmlFor} className={'label'}>
      {children}
      <span>{value}</span>
    </label>
  ) : null;
}
