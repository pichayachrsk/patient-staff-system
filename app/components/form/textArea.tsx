import { ChangeEventHandler } from "react";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
}

export const TextArea = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  error,
}: TextAreaProps) => {
  return (
    <div className="col-span-full">
      {" "}
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2.5 border rounded-lg bg-white outline-none transition-colors resize-none
          ${
            error
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
      />
      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
};
