// 한글 주석: 단일 선택 토글 그룹 (shadcn ToggleGroup 대체)
import { ReactNode } from "react";

export function ToggleGroup({
  type,
  value,
  onValueChange,
  children,
  className = "",
}: {
  type: string;
  value: string;
  onValueChange: (v: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
}

export function ToggleGroupItem({
  value,
  current,
  onChange,
  children,
}: {
  value: string;
  current: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`px-3 py-1.5 rounded-full border text-sm transition
        ${
          active
            ? "bg-black text-white border-black"
            : "bg-white hover:bg-black/5 border-black/10"
        }`}
    >
      {children}
    </button>
  );
}
