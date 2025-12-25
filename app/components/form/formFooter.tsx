interface FormFooterProps {
  onClear: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clearText?: string;
  submitText?: string;
}

export const FormFooter = ({
  onClear,
  onSubmit,
  clearText = "Clear Form",
  submitText = "Submit",
}: FormFooterProps) => {
  return (
    <div className="col-span-full flex flex-col md:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
      <button
        type="button"
        onClick={onClear}
        className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors order-2 md:order-1"
      >
        {clearText}
      </button>

      <button
        type="submit"
        onClick={onSubmit}
        className="px-10 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95 order-1 md:order-2"
      >
        {submitText}
      </button>
    </div>
  );
};
