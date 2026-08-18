export default function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] md:text-sm text-white mb-1.5 text-left">
      {children}
    </label>
  );
}