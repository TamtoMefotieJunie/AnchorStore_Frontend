export default function FormInput({
  label,
  name,
  type,
  autoComplete,
  required = false,
  placeholder = "",
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-gray-400 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
