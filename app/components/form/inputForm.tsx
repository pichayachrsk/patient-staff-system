import { ChangeEventHandler } from "react";

interface InputFormProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputForm = ({
  name,
  label,
  type,
  placeholder,
  error,
  value,
  onChange,
}: InputFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-small text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg px-3 py-2 outline-none transition-colors
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
