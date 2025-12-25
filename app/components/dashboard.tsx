interface DashboardProps {
  children: React.ReactNode;
  header: string;
  rightHeader: string;
  rightHeaderColor: string;
  labelRightHeader: string;
}

export const Dashboard = ({
  header,
  rightHeader,
  rightHeaderColor,
  labelRightHeader,
  children,
}: DashboardProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-white font-medium tracking-widest">{header}</h2>
        <div className="flex items-center gap-2">
          <p className="text-slate-300 text-sm">
            {labelRightHeader} :{" "}
            <span className={`font-medium ${rightHeaderColor}`}>{rightHeader}</span>
          </p>
        </div>
      </div>

      <div className="bg-white">{children}</div>
    </div>
  );
};
