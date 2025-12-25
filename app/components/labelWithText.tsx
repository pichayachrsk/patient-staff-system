interface LabelWithTextProps {
  label: string;
  text: string;
}

export const LabelWithText = ({ label, text }: LabelWithTextProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-1">
      <span className="text-slate-500 text-xs sm:text-sm font-medium sm:w-35 shrink-0">
        {label} :
      </span>
      <span className="text-emerald-900 font-semibold text-sm sm:text-base break-all sm:break-words">
        {text || "-"}
      </span>
    </div>
  );
};