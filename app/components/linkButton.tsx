import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
  target?: string;
  bgColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
}

const defaultBgColor = "bg-white";
const defaultHoverBgColor = "bg-gray-100";
const defaultBorderColor = "border-gray-300";

export const LinkButton = ({
  href,
  text,
  target,
  bgColor = defaultBgColor,
  hoverBgColor = defaultHoverBgColor,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={`px-4 py-2 border ${defaultBorderColor} shadow ${bgColor} rounded hover:${hoverBgColor} transition`}
    >
      {text}
    </Link>
  );
};
