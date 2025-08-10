// 한글 주석: 버튼 기본/서브/아웃라인 변형 지원
import { ButtonHTMLAttributes, ReactNode } from "react";

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
  const base = "px-3 py-2 rounded-xl text-sm font-medium transition";
  const styles: Record<Variant, string> = {
    default: "bg-black text-white hover:bg-black/85",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 hover:bg-gray-50",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
