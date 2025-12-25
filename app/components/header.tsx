interface HeaderProps {
  text: string;
}

export const Header = ({ text }: HeaderProps) => {
  return (
    <p className="mb-4 font-bold tracking-widest text-emerald-600">{text}</p>
  );
};
