import { ChangeEventHandler } from "react";

interface Options {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Options[];
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
}

export const Dropdown = ({
  options,
  label,
  name,
  value,
  onChange,
  error,
}: DropdownProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2.5 border rounded-lg bg-white outline-none transition-colors
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
      >
        <option value="" hidden>
          Select {label}
        </option>
        {options.map((e) => (
          <option key={e.value} value={e.value}>
            {e.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
