// Button.tsx

import { ButtonHTMLAttributes, ReactNode } from "react";
import { PctBadge } from "../common/PctBadge";

type Variant = "default" | "secondary" | "outline";

export function Button({
  children,
  variant = "default",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  const base =
    "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200";
  const styles: Record<Variant, string> = {
    default:
      "bg-stone-700 text-white hover:bg-stone-600 border border-stone-700",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200",
    outline:
      "bg-white text-stone-700 hover:bg-stone-100 border border-stone-300",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

// Pill 버튼 (Button 컴포넌트 기반)
export const Pill: React.FC<{
  active?: boolean;
  onClick?: () => void;
  label: string;
  pct: number | null;
}> = ({ active, onClick, label, pct }) => {
  return (
    <Button
      onClick={onClick}
      variant={active ? "default" : "outline"}
      className="flex items-center gap-2"
    >
      <span className="font-medium">{label}</span>
      <PctBadge value={pct} />
    </Button>
  );
};
